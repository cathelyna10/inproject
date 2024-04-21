const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const US_action = require('../models/us_action');
const Country = require('../models/country');

const bodyParser = require('body-parser');

router.get('/', async (req, res, next) => {
  let us_actions = await US_action.all();
  res.render('us_actions/index', { title: 'Imperial Footprints || US Actions', us_actions: us_actions });
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'Imperial Footprints || US Actions ', us_actions: US_action.get(req.params.id)
  }
  if (templateVars.us_action.us_actionId) {
    templateVars['us_action'] = US_action.get(templateVars.us_action.us_actionId);
  }
  res.render('us_actions/show', templateVars);
});

module.exports = router;

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

