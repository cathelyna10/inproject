const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');

const bodyParser = require('body-parser');

router.get('/', async (req, res, next) => {
  let genres = await Genre.all();
  res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

/*
router.get('/edit', async (req, res, next) => {
  let genreIndex = req.query.id;
  let genre = Genre.get(genreIndex);
  res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIndex: genreIndex, books: Book });
});
*/
/*
router.get('/form', async (req, res, next) => {
  res.render('genres/form', { title: 'BookedIn || Genres', books: Book.all });
});
*/

router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'BookedIn || Genres' }
  if (req.query.id) {
    let genre = await Genre.get(req.query.id)
    if (genre) {templateVars['genre'] = genre}
  }
  res.render('genres/form', templateVars);
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Genre.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'A Genre has been created!',
  };
  res.redirect(303, '/genres')
 });
 
/*
router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsert(req.body);
  res.redirect(303, '/genres');
});
*/
router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Genres', genre: Genre.get(req.params.id)
  }
  if (templateVars.genre.genreId) {
    templateVars['genre'] = Genre.get(templateVars.genre.genreId);
  }
  res.render('genres/show', templateVars);
});



module.exports = router;


