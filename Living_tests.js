"use strict"

const Living_tests = (object = {}) => {
	require('./elhin/String')
	const Dir = require('./elhin/Dir')

	object.dir = Dir(__dirname)

	return object
}

module.exports = Living_tests
