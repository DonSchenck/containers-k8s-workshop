'use strict'

const os = require('os')

exports.getHost = function(req, res) {
    res.send('resthost v1 running on host: ' + os.hostname())
}