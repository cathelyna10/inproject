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
/*
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
*/


router.get('/show/:id', async (req, res) => {
  try {
    const countryId = req.params.id;
    const country = await Country.get(countryId); 
    if (!country) {
      return res.status(404).send("Country not found");
    }

    // Fetch associated event data for the country
    // Assuming you have a method to fetch events associated with a country in your Country model
    const events = await Country.getEventsForCountry(countryId);

    let templateVars = {
      title: 'Imperial Footprints || Countries',
      country: country,
      events: events // Pass the events data to the template
    };
    res.render('countries/show', templateVars);
  } catch (error) {
    console.error(`Failed to fetch country with id ${req.params.id}:`, error);
    res.status(500).send("Error retrieving country data.");
  }
});






router.get('/edit', async (req, res, next) => {
  try {
    const countryIndex = req.query.id;
    const country = await Country.get(countryIndex);
    res.render('countries/form', { title: 'Imperial Footprints || Country', country: country, countryIndex: countryIndex, events: Event });
  } catch (error) {
    console.error('Error fetching country for editing:', error);
    res.status(500).send('Error fetching country for editing');
  }
});


router.get('/form', async (req, res, next) => {
  try {
    let templateVars = { title: 'Imperial Footprints || Countries' };
    if (req.query.id) {
      let country = await Country.get(req.query.id);
      if (country) {
        templateVars['country'] = country;
      }
    }
    res.render('countries/form', templateVars);
  } catch (error) {
    console.error('Error rendering country form:', error);
    res.status(500).send('Error rendering country form');
  }
});

router.post('/upsert', async (req, res, next) => {
  try {
    console.log('body: ' + JSON.stringify(req.body));
    await Country.upsert(req.body);
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: 'The country has been added or updated successfully!',
    };
    res.redirect(303, '/countries');
  } catch (error) {
    console.error('Error adding/updating country:', error);
    req.session.flash = {
      type: 'error',
      intro: 'Error!',
      message: 'Failed to add or update the country. Please try again later.',
    };
    res.redirect(303, '/countries/form');
  }
});
module.exports = router;


/*

 

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsert(req.body);
  res.redirect(303, '/countries');
});
*/

