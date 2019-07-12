'use strict'

const os = require('os')

exports.getHost = function(req, res) {
    res.send(os.hostname())
}