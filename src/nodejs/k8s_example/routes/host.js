var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('The HOST for the called microservice is: ');
});

module.exports = router;
