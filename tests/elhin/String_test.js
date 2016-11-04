'use strict'
const assert = require('../../assert')

// testing String monkey patch / extension methods
require('../../elhin/String')

// should contain the only character it contains
assert.equal('1'.contains('1'), true)

// should contain itself
assert.equal('normal sized string'.contains('normal sized string'), true)

// should contain needle when needle is in the middle of the haystack
assert.equal('normal sized string'.contains('sized'), true)

// should not contain a character that is not in the string
assert.equal('2'.contains('1'), false)

// should not contain needle when haystack is empty
assert.equal(''.contains('1'), false)

// skip() should return the characters after the ones skipped'
assert.equal('abcdefg'.skip(3), 'defg')

// skip() should return the same string when you are skipping 0 chars of a non-empty string', function() {
assert.equal('abcdefg'.skip(0), 'abcdefg')

// skip() should return an empty string when skipping the exact length of the string
assert.equal('12345'.skip(5), '')

// skip() should return the last character when you are skipping 1 less than the length of the string
assert.equal('12345'.skip(4), '5')

// skip() should return an empty string when you are skipping 1 more than the length of the string
assert.equal('12345'.skip(6), '')

// skip() should return an empty string when skipping 0 chars of an empty string
assert.equal(''.skip(0), '')

// skip() should return an empty string when skipping 1 char of an empty string
assert.equal(''.skip(1), '')

assert.equal('abc45'.skip(1), 'bc45')

// removeEnd() should remove last char of 3 char string
assert.equal('xyz'.removeEnd(), 'xy')

// removeEnd()' should remove last char of 2 char string
assert.equal('ab'.removeEnd(), 'a')

// removeEnd() should should return empty string when starting with single char string
assert.equal('a'.removeEnd(), '')

// removeEnd() should return empty string when starting with empty string
assert.equal(''.removeEnd(), '')

// escape() should put a backslash before a space when all there is is a space and that is what we are escaping
assert.equal(' '.escape(' '), '\\ ')

// escape() should put a backslash before a space when it is between 2 words and space is what we are escaping
assert.equal('some name'.escape(' '), 'some\\ name')

// escape() should not alter string without the character being escaped
assert.equal('some name'.escape('.'), 'some name')

// escape() should return empty string when starting with empty string
assert.equal(''.escape(' '), '')

// escape() should not escape backslash when escaping char not found
assert.equal('some \\ text'.escape('.'), 'some \\ text')

// escape() should not escape backslash when escaping char found
assert.equal('some \\ text'.escape(' '), 'some\\ \\\\ text')

// escape() should escape backslash when escaping backslash
assert.equal('some \\ text'.escape('\\'), 'some \\\\ text')

// afterLast() should return the characters after the last instance of needle in the haystack when needle is in haystack multiple times
assert.equal('/some dir/another dir/filename'.afterLast('/'), 'filename')

// afterLast() should return what comes after needle when needle is a single char and is in the middle of haystack
assert.equal('/some dir/another dir/filename.txt'.afterLast('.'), 'txt')

// afterLast() should return an empty string when needle is at the end of haystack
assert.equal('/some dir/another dir/filename'.afterLast('filename'), '')

// afterLast() should return an empty string when needle not in haystack
assert.equal('/some dir/another dir/filename.txt'.afterLast('4'), '')

// afterLast() should return an empty string when haystack is empty
assert.equal(''.afterLast('a'), '')

// beforeLast() should return the characters before the last instance of needle when needle is in the haystack twice
assert.equal('/some dir/another dir/filename'.beforeLast('/'), '/some dir/another dir')

// beforeLast() should return what came before needle when needle is a single character and is in the middle of the string
assert.equal('/some dir/another dir/filename.txt'.beforeLast('.'), '/some dir/another dir/filename')

// beforeLast() should return an empty string when the needle is at the beginning of the haystack
assert.equal('/some dir/another dir/filename'.beforeLast('/some'), '')

// beforeLast() should return the haystack when needle not found
assert.equal('/some dir/another dir/filename.txt'.beforeLast('4'), '/some dir/another dir/filename.txt')

// beforeLast() should return an empty string when the needle does not exist and it is operating on an empty string
assert.equal(''.beforeLast('a'), '')

// getVimNoMagic() should return backslash V when passed an empty string
assert.equal(''.getVimNoMagic(), '\\V')

// getVimNoMagic() should should add backslash V to the beginning of the string
assert.equal('[1]%*()abc'.getVimNoMagic(), '\\V[1]%*()abc')

// getVimNoMagic() should escape backslash when that is the only character
assert.equal('\\'.getVimNoMagic(), '\\V\\\\')

// getVimNoMagic() should return string with backslashes escaped when the backsash is in the middle of the string
assert.equal('abc\\123'.getVimNoMagic(), '\\Vabc\\\\123')
