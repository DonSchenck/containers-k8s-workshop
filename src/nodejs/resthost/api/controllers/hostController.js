'use strict'

exports.getHost = function(req, res) {
    res.send(req.hostname)
}