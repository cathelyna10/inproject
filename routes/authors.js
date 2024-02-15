const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');


router.get('/', function(req, res, next) {
  const authors = Author.all
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});

router.get('/edit', async (req, res, next) => {
  let authorIndex = req.query.id;
  let author = Author.get(authorIndex);
  res.render('authors/form', { title: 'BookedIn || Authors', author: author, authorIndex: authorIndex, books: Book });
});

router.get('/form', async (req, res, next) => {
  res.render('authors/form', { title: 'BookedIn || Authors', book: Books });
});

//router.post('/create', async (req, res, next) => {
 // console.log('body: ' + JSON.stringify(req.body))
  //make the body available, pass it to the model
 // Author.add(req.body);
 // res.redirect(303, '/authors')
//});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body));
  Author.upsert(req.body);
  res.redirect(303, '/authors');
}); 

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Author', author: Author.get(req.params.id)
  }
  res.render('authors/show', templateVars);
});

  //const authors = [
    //"James S. A. Corey", "Craig Alanson", "Cixin Liu"
  //]
  //res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });


module.exports = router;

