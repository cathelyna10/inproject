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

router.get('/edit', async (req, res, next) => {
  let countryIndex = req.query.id;
  let country = Country.get(countryIndex);
  res.render('countries/form', { title: 'Imperial Footprints || Country', country: country, countryIndex: countryIndex, events: Event });
});

router.get('/form', async (req, res, next) => {
  res.render('countries/form', { title: 'Imperial Footprints || Countries', events: Event.all });
});


router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'Imperial Footprints || Countries' }
  if (req.query.id) {
    let country = await Country.get(req.query.id)
    if (country) {templateVars['country'] = country}
  }
  res.render('countries/form', templateVars); 
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Country.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'A new country has been added!',
  };
  res.redirect(303, '/countries')
 });

module.exports = router;


/*

 

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsert(req.body);
  res.redirect(303, '/countries');
});
*/

