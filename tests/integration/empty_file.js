"use strict"
const assert = require('../../assert')
const File = require('../../elhin/File')
const Living_tests = require('../../Living_tests')

// testing File and Dir
// when working with an empty text file

let static_data_dir = null
let file = null
let setup = () => {
	static_data_dir = Living_tests().dir.get_contained_dir('static test data')
	file = static_data_dir.get_contained_file('empty file.txt')
}

// file should exist
setup()
assert.equal(file.exists(), true)

// file is zero bytes
setup()
assert.equal(0, file.size())

// file has no lines
setup()
assert.equal(0, file.read_lines().length)

// can't find stuff in an empty file
setup()
assert.equal(0, file.find_all('class').length)

// parent dir contains_file_path_recursive
setup()
assert.equal(static_data_dir.contains_file_path_recursive(file.path), true)
