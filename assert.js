"use strict"

let assert= require('assert')

let Assert= (state={}) => {
	state.equal= (expected, actual) => {
		assert.equal(expected, actual)
		return '✔' // returning a check mark to indicate the assertion passed. This is needed because the REPL will output whatever this function returns.
	}
	return state
}

module.exports= Assert()
