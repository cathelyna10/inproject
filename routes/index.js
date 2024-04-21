const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Imperial Footprints' });
});
module.exports = router;


  

//this file just exports
// all u can see is file exports and the router.

// this file is the same as the const indexrouter


// index router slash, and then a different slash form for book authors etc
// maybe slash insert