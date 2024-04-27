const express = require('express');
const router = express.Router();
const Individual = require('../models/individual');


router.get('/', async (req, res) => {
  try {
    let individuals = await Individual.all();
    res.render('individuals/index', { title: 'List of Individuals', individuals: individuals });
  } catch (error) {
    console.error("Failed to retrieve individuals:", error);
    res.status(500).send("Error accessing individuals data.");
  }
});

router.get('/show/:id', async (req, res) => {
  try {
    let individual = await Individual.get(req.params.id); 
    if (!individual) {
      return res.status(404).send("Individual not found");
    }
    let templateVars = {
      title: 'Imperial Footprints || Individuals',
      individual: individual
    };
    res.render('individuals/show', templateVars);
  } catch (error) {
    console.error(`Failed to fetch individual with id ${req.params.id}:`, error);
    res.status(500).send("Error retrieving individual data.");
  }
});

module.exports = router;
