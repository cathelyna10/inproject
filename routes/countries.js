const express = require('express');
const router = express.Router();
const Country = require('../models/country');


router.get('/', async (req, res) => {
  try {
    let countries = await Country.all();
    res.render('countries/index', { title: 'List of Countries', countries: countries });
  } catch (error) {
    console.error("Failed to retrieve countries:", error);
    res.status(500).send("Error accessing countries data.");
  }
});

router.get('/show/:id', async (req, res) => {
  try {
    let country = await Country.get(req.params.id); 
    if (!country) {
      return res.status(404).send("Country not found");
    }
    let templateVars = {
      title: 'Imperial Footprints || Countries',
      country: country
    };
    res.render('countries/show', templateVars);
  } catch (error) {
    console.error(`Failed to fetch country with id ${req.params.id}:`, error);
    res.status(500).send("Error retrieving country data.");
  }
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

