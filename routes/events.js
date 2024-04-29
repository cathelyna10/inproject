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
    console.log('Requested Event ID:', eventId);  // Confirming the event ID being requested
    const eventData = await Event.allForEvent(eventId);
    console.log('EventData:', eventData);  // Logging the data structure returned from the DB

    if (!eventData || eventData.length === 0) {
      console.log('Event not found for ID:', eventId);  // More detailed logging for not found
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

/*
router.get('/show/:id', async (req, res) => {
  try {
    let event = await Event.getWithCountry(req.params.id); 
    if (!event) {
      return res.status(404).send("Event not found");
    }
    let templateVars = {
      title: 'Imperial Footprints || Events',
      event: event, country: event.country 
    };
    res.render('events/show', templateVars);
  } 
  */
  





/*
router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex, books: Book });
});
*/

/*
router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await US_action.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'the author has been created!',
  };
  res.redirect(303, '/authors')
 });


router.get('/form', async (req, res, next) => {
  let templateVars = { title: 'BookedIn || Authors' }
  if (req.query.id) {
    let us_action = await US_action.get(req.query.id)
    if (us_action) {templateVars['us_action'] = us_action}
  }
  res.render('authors/form', templateVars);
});
 */
/*
router.get('/form', async (req, res, next) => {
  res.render('authors/form', { title: 'BookedIn || Authors', book: Books });
});
*/
//router.post('/create', async (req, res, next) => {
 // console.log('body: ' + JSON.stringify(req.body))
  //make the body available, pass it to the model
 // Author.add(req.body);
 // res.redirect(303, '/authors')
//});
/*router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the author has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/authors')
});

*/




  //const authors = [
    //"James S. A. Corey", "Craig Alanson", "Cixin Liu"
  //]
  //res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });



/*
templateVars.book.authors = await Author.allForBook(templateVars.book);

  if (templateVars.book.genreId) {
    templateVars['genre'] = await Genre.get(templateVars.book.genreId);
  }
  if (req.session.currentUser) {
    templateVars['bookUser'] = await BookUser.get(templateVars.book, req.session.currentUser);
  }

  if (req.session.currentUser) {
    templateVars['comments'] = Comment.AllForBook(req.params.id, req.session.currentUser.email);
  }
  res.render('events/show', templateVars);

*/

/*
router.get('/edit', async (req, res, next) => {
  let eventId = req.query.id;
  let event = await Event.get(eventId);
  event.authorIds = (await Author.allForBook(book)).map(author => author.id);
  res.render('events/form', { title: 'Imperial Footprints || Books', book: book, authors: await Author.all(), genres: await Genre.all() });
});


router.get('/form', async (req, res, next) => { 
  res.render('books/form', { title: 'BookedIn || Books', authors: await Author.all, genres: await Genre.all });
});


router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});


router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Books',
    book: await Book.get(req.params.id),
    bookId: req.params.id,
    statuses: BookUser.statuses,
    Comments: Comment.AllForBook(req.params.id)

  }

  /*
  if (templateVars.book.authorIds) {
    templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId));
  }
*/


  //const authors = [
    //"James S. A. Corey", "Craig Alanson", "Cixin Liu"
  //]
  //res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
  //





