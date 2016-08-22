"use strict"

let assert= require('assert')

let Assert= (state={}) => {
	state.equal= (expected, actual) => {
		assert.equal(expected, actual)
		return 'pass'
	}
	return state
}

module.exports= Assert()
