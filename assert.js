"use strict"

let originalAssert= require('assert')

let assert= (state={}) => {
	state.equal= (expected, actual) => {
		originalAssert.equal(expected, actual)
		return '✔' // returning a check mark to indicate the assertion passed. This is needed because the REPL will output whatever this function returns.
	}
	return state
}

module.exports= assert
