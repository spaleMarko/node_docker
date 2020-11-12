const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({users: [{id: 1, email: 'marko@gmail.com'}, {id: 2, email: 'martina@gmail.com'}]});
  });
  
  module.exports = router;