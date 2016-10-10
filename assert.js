"use strict"

const original_assert = require('assert')

const assert = (object = {}) => {
	const pass_string = '✔' // returning this after an assertion does not fail is needed because the REPL will output whatever the assertion returns.

	// A strict equality assertion. Testing tools should use strict equality comparison as the default, not the other way around.
	object.equal = (actual, expected) => {
		original_assert.strictEqual(actual, expected)
		return pass_string
	}

	// A strict, deep equality assertion. Testing tools should use strict equality comparison as the default, not the other way around.
	object.deep_equal = (actual, expected) => {
		original_assert.deepStrictEqual(actual, expected)
		return pass_string // returning a check mark to indicate the assertion passed. This is needed because the REPL will output whatever this function returns.
	}

	return object
}

module.exports = assert()
