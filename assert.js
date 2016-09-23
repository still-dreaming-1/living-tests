"use strict"

let originalAssert= require('assert')

let assert= (state={}) => {
	const passString= '✔' // returning this after an assertion does not fail is needed because the REPL will output whatever the assertion returns.
	state.equal= (expected, actual) => {
		originalAssert.equal(expected, actual)
		return passString 
	}
	state.deepEqual= (expected, actual) => {
		originalAssert.deepEqual(expected, actual)
		return passString // returning a check mark to indicate the assertion passed. This is needed because the REPL will output whatever this function returns.
	}
	return state
}

module.exports= assert()
