const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const books = [
    "Book1", "Book2", "Book3"
  ]
  res.render('books/index', { title: 'BookedIn || Books', books: books });
});

module.exports = router;

