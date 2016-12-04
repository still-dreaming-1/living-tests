'use strict'

const Elhin = (object = {}) => {
	object.File = require('./File')
	object.Dir = require('./Dir')
	object.Position = require('./Position')
	object.Shell = require('./Shell')
	return object
}

module.exports = Elhin
