"use strict"
const assert = require('assert')

assert(!Array.prototype.hasOwnProperty('contains_test'), 'Array.contains_test() already exists. See, they told you monkey patching was bad...')
Array.prototype.containsTest = function(test) {
	for(let value of this) {
		if(test(value))
			return true
	}
	return false
}
