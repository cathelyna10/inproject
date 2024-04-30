const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const Country = require('../models/country');
const UsAction = require('../models/us_action');    // Including the UsAction model
const Individual = require('../models/individual'); // Including the Individual model

// List all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.all();
    console.log('Fetched Events:', events);  // Logging fetched events for debugging
    res.render('events/index', { title: 'Imperial Footprints || Events', events: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Show details for a specific event
router.get('/show/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    console.log('Requested Event ID:', eventId);  
    const eventData = await Event.allForEvent(eventId);
    console.log('EventData:', eventData);  

    if (!eventData || eventData.length === 0) {
      console.log('Event not found for ID:', eventId); 
      return res.status(404).send('Event not found');
    }

    // Aggregating data for the template
    const event = eventData[0];
    const countries = new Set();
    const usActions = new Set();
    const individuals = new Set();

    eventData.forEach(row => {
      countries.add({ id: row.countryId, name: row.countryName });
      usActions.add({ id: row.usActionId, name: row.usActionName });
      individuals.add({ id: row.individualId, name: row.individualName });
    });

    res.render('events/show', {
      title: 'Imperial Footprints || Event Details',
      event,
      countries: Array.from(countries),
      usActions: Array.from(usActions),
      individuals: Array.from(individuals)
    });
  } catch (error) {
    console.error('Error fetching event details for ID:', eventId, error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
  

//this file just exports
// all u can see is file exports and the router.

// this file is the same as the const indexrouter


// index router slash, and then a different slash form for book authors etc
// maybe slash insert