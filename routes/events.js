const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const US_action = require('../models/us_action');
const Country = require('../models/country');

const bodyParser = require('body-parser');

router.get('/', async (req, res, next) => {
  let events = await Event.all();
  res.render('events/index', { title: 'Imperial Footprints || Events', events: events });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'Imperial Footprints || Events ', events: Event.get(req.params.id)
  }
  if (templateVars.event.eventId) {
    templateVars['event'] = Event.get(templateVars.event.eventId);
  }
  res.render('events/show', templateVars);
});

module.exports = router;

/*
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
  res.render('events/show', templateVars);

*/

/*
router.get('/edit', async (req, res, next) => {
  let eventId = req.query.id;
  let event = await Event.get(eventId);
  event.authorIds = (await Author.allForBook(book)).map(author => author.id);
  res.render('events/form', { title: 'Imperial Footprints || Books', book: book, authors: await Author.all(), genres: await Genre.all() });
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


  //const authors = [
    //"James S. A. Corey", "Craig Alanson", "Cixin Liu"
  //]
  //res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
  //





