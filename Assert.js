'use strict'

const Assert = (object = {}) => {
	const original_assert = require('assert')
	const chai_assert = require('chai').assert

	object.pass_string = '✔' // returning this after an assertion does not fail is needed because the REPL will output whatever the assertion returns.

	// A strict equality assertion. Testing tools should use strict equality comparison as the default, not the other way around.
	object.equal = (actual, expected) => {
		original_assert.strictEqual(actual, expected)
		return object.pass_string
	}

	// A strict, deep equality assertion. Testing tools should use strict equality comparison as the default, not the other way around.
	object.deep_equal = (actual, expected) => {
		original_assert.deepStrictEqual(actual, expected)
		return object.pass_string
	}

	object.greater_than = (actual, value_to_be_greater_than) => {
		chai_assert.isAbove(actual, value_to_be_greater_than)
		return object.pass_string
	}

	return object
}

module.exports = Assert
