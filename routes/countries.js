const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const US_action = require('../models/us_action');
const Country = require('../models/country');

const bodyParser = require('body-parser');

router.get('/', async (req, res, next) => {
  let countries = await Country.all();
  res.render('countries/index', { title: 'Imperial Footprints || Country', countries: countries });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'Imperial Footprints || Countries ', country: Country.get(req.params.id)
  }
  if (templateVars.country.countryId) {
    templateVars['country'] = Country.get(templateVars.country.countryId);
  }
  res.render('countries/show', templateVars);
});

module.exports = router;


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


router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'Imperial Footprints || Countries' }
  if (req.query.id) {
    let country = await Country.get(req.query.id)
    if (genre) {templateVars['country'] = country}
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

