const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', function(req, res, next) {
  const authors = Author.all
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});


router.get('/form', async (req, res, next) => {
  res.render('authors/form', { title: 'BookedIn || Authors' });
});

router.post('/create', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  //make the body available, pass it to the model
  Author.add(req.body);
  res.redirect(303, '/authors')
});


  //const authors = [
    //"James S. A. Corey", "Craig Alanson", "Cixin Liu"
  //]
  //res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });


module.exports = router;

