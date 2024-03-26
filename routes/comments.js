const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Book = require('../models/book');

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  
  let bookId = req.body.bookId;
  let redirect = `/books/show/${bookId}`;
  
  Comment.upsert(req.body);
  
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'Your comment has been posted',
  };
  res.redirect(303, redirect)
});

router.get('/edit', async (req, res, next) => {
  let commentIndex = req.query.id;
  let comment = Comment.get(commentIndex);
  res.render('comments/form', { title: 'BookedIn || Edit Comment', comment:comment, commentIndex: commentIndex });
});
module.exports = router;