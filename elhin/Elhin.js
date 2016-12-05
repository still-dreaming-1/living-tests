'use strict'

const Elhin = (object = {}) => {
	object.File = require('./File')
	object.Dir = require('./Dir')
	object.Position = require('./Position')
	object.Shell = require('./Shell')
	object.Console = () => console
	return object
}

module.exports = Elhin
