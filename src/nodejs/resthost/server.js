const express = require('express'),
  app = express('0.0.0.0'),
  port = process.env.PORT || 3000;

const routes = require('./api/routes/hostRoutes')
routes(app)

app.listen(port);

console.log('host RESTful API server started on port ' + port);