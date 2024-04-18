const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookUser = require('../models/book_user');
const Comment = require('../models/comment');
const bodyParser = require('body-parser');
/*
router.get('/', async (req, res, next) => {
  let books = await Book.all();
  res.render('books/index', { title: 'BookedIn || Books', books: books });
 });

*/
router.get('/', async (req, res, next) => {
  const books = await Book.all()
  res.render('books/index', { title: 'BookedIn || Books', books: books });
});


router.get('/edit', async (req, res, next) => {
  let bookId = req.query.id;
  let book = await Book.get(bookId);
  book.authorIds = (await Author.allForBook(book)).map(author => author.id);
  res.render('books/form', { title: 'BookedIn || Books', book: book, authors: await Author.all(), genres: await Genre.all() });
});

router.get('/form', async (req, res, next) => { 
  res.render('books/form', { title: 'BookedIn || Books', authors: await Author.all, genres: await Genre.all });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});


router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Books',
    book: await Book.get(req.params.id),
    bookId: req.params.id,
    statuses: BookUser.statuses,
    Comments: Comment.AllForBook(req.params.id)

  }

  /*
  if (templateVars.book.authorIds) {
    templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId));
  }
*/
  templateVars.book.authors = await Author.allForBook(templateVars.book);

  if (templateVars.book.genreId) {
    templateVars['genre'] = await Genre.get(templateVars.book.genreId);
  }
  if (req.session.currentUser) {
    templateVars['bookUser'] = await BookUser.get(templateVars.book, req.session.currentUser);
  }

  if (req.session.currentUser) {
    templateVars['comments'] = Comment.AllForBook(req.params.id, req.session.currentUser.email);
  }
  res.render('books/show', templateVars);
});

  //const authors = [
    //"James S. A. Corey", "Craig Alanson", "Cixin Liu"
  //]
  //res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
  //


module.exports = router;


