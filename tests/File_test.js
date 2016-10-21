"use strict"
const assert = require('../assert')

// testing String monkey patch / extension methods
const File = require('../elhin/File')

let file = File('/some/file/path.txt')
assert.equal(file.path, '/some/file/path.txt')

assert.equal(file.extension, 'txt')
assert.equal(file.name_without_extension, 'path')
assert.equal(file.exists(), false)
