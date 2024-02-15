const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', function(req, res, next) {
  const books = Book.all
  res.render('books/index', { title: 'BookedIn || Books', books: books });
});


router.get('/form', async (req, res, next) => {
  res.render('books/form', { title: 'BookedIn || Books' });
});

router.post('/create', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  //make the body available, pass it to the model
  Book.add(req.body);
  res.redirect(303, '/books')
});


  //const authors = [
    //"James S. A. Corey", "Craig Alanson", "Cixin Liu"
  //]
  //res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });


module.exports = router;


