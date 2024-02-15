const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

const bodyParser = require('body-parser');

router.get('/', function(req, res, next) {
  const genres = Genre.all
  res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

router.get('/edit', async (req, res, next) => {
  let genreIndex = req.query.id;
  let genre = Genre.get(genreIndex);
  res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIndex: genreIndex, books: Book });
});

router.get('/form', async (req, res, next) => {
  res.render('genres/form', { title: 'BookedIn || Genres', books: Book.all });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsert(req.body);
  res.redirect(303, '/genres');
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Genres', genre: Genre.get(req.params.id)
  }
  if (templateVars.genre.authorId) {
    templateVars['genre'] = Genre.get(templateVars.genre.authorId);
  }
  res.render('genres/show', templateVars);
});



module.exports = router;


