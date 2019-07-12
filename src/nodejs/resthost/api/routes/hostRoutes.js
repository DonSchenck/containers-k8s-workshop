'use strict';

module.exports = function(app) {
    var host = require('../controllers/hostController')

    // host Route(s)
    app.route('/host').get(host.getHost)
}