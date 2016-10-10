"use strict"

let original_assert = require('assert')

let assert = (object = {}) => {
	const pass_string = '✔' // returning this after an assertion does not fail is needed because the REPL will output whatever the assertion returns.
	object.equal = (expected, actual) => {
		original_assert.equal(expected, actual)
		return pass_string
	}
	object.deepEqual = (expected, actual) => {
		original_assert.deepEqual(expected, actual)
		return pass_string // returning a check mark to indicate the assertion passed. This is needed because the REPL will output whatever this function returns.
	}
	return object
}

module.exports = assert()
