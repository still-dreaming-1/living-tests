'use strict'

const Living_tests = (object = {}) => {
	object.elhin = require('./elhin/Elhin')()
	object.dir = object.elhin.Dir(__dirname)
	object.Runner = require('./Runner')
	object.Tests = require('./Tests')
	object.Assert = require('./Assert')
	return object
}

module.exports = Living_tests
