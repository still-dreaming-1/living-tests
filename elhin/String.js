'use strict'
const assert = require('assert')

assert(!String.prototype.hasOwnProperty('contains'), 'String.contains() already exists. See, they told you monkey patching was bad...')
String.prototype.contains = function(needle, start_index = 0) {
	return this.includes(needle, start_index)
}

assert(!String.prototype.hasOwnProperty('skip'), 'String.skip() already exists. See, they told you monkey patching was bad...')
String.prototype.skip = function(count) {
	return this.substr(count)
}

// remove the last character
assert(!String.prototype.hasOwnProperty('removeEnd'), 'String.removeEnd() already exists. See, they told you monkey patching was bad...')
String.prototype.removeEnd = function() {
	return this.substring(0, this.length - 1)
}

// returns a string with the character in char escaped by a backslash
assert(!String.prototype.hasOwnProperty('escape'), 'String.escape() already exists. See, they told you monkey patching was bad...')
String.prototype.escape = function(char) {
	char = '' + char
	if(char.length > 1)
		char = char.substring(0, 1)
	let remaining = this
	let ret = ''
	do {
		if(remaining.startsWith(char))
			ret = ret + '\\'
		ret = ret + remaining.substring(0, 1)
		remaining = remaining.skip(1)
	} while(remaining.length > 0)
	return ret
}

assert(!String.prototype.hasOwnProperty('afterLast'), 'String.afterLast() already exists. See, they told you monkey patching was bad...')
String.prototype.afterLast = function(needle) {
	let i = this.lastIndexOf(needle)
	if(i === -1)
		return ''
	return this.substring(i + needle.length)
}

assert(!String.prototype.hasOwnProperty('beforeLast'), 'String.beforeLast() already exists. See, they told you monkey patching was bad...')
String.prototype.beforeLast = function(needle) {
	let i = this.lastIndexOf(needle)
	if(i === -1)
		return this
	if(i <= 0)
		return ''
	return this.substring(0, i)
}
// this helps when you are using strings that are interpreted as Vim patterns, but you don't want them to be
assert(!String.prototype.hasOwnProperty('getVimNoMagic'), 'String.getVimNoMagic() already exists. See, they told you monkey patching was bad...')
String.prototype.getVimNoMagic = function() {
	let escaped_string = this.escape('\\')
	// see :h \V in Vim for info about this very nomagic trick
	return '\\V' + escaped_string
}
