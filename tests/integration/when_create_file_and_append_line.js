"use strict"

// when create() a file and append_line() to it

const assert = require('../../assert')
const File = require('../../elhin/File')
const Living_tests = require('../../Living_tests')

let test_data_dir = null
let file = null
const Test_data_dir = () => {
	return Living_tests().dir.get_contained_dir('test data')
}

const setup = () => {
	tear_down_without_assertions_or_exceptions()
	test_data_dir = Test_data_dir()
	assert.equal(test_data_dir.exists(), false)
	test_data_dir.create()
	assert.equal(test_data_dir.exists(), true)
	file = test_data_dir.get_contained_file('file.txt')
	assert.equal(file.exists(), false)
	file.create()
	assert.equal(file.exists(), true)
	file.append_line('I am a line!')
}

const tear_down_without_assertions_or_exceptions = () => {
	test_data_dir = Test_data_dir()
	if(test_data_dir.exists())
		test_data_dir.delete()
}

const tear_down = () => {
	test_data_dir = Test_data_dir()
	if(test_data_dir.exists())
		test_data_dir.delete()
	assert.equal(test_data_dir.exists(), false)
}

setup()
// only the 1 txt file exists when using get_all_files()
let all_files_non_recursive = test_data_dir.get_all_files()
assert.equal(all_files_non_recursive.length, 1)
assert.equal(all_files_non_recursive[0].path, file.path)
tear_down()

// no directories exist when using get_all_dirs()
setup()
let all_dirs_non_recursive = test_data_dir.get_all_dirs()
assert.equal(all_dirs_non_recursive.length, 0)
tear_down()

// no directories exist when using get_all_dirs_recursive()
setup()
let all_dirs_recursive = test_data_dir.get_all_dirs_recursive()
assert.equal(all_dirs_non_recursive.length, 0)
tear_down()

// only the 1 txt file exists when using get_all_files_recursive()
setup()
let all_files_recursive = test_data_dir.get_all_files_recursive()
assert.equal(all_files_recursive.length, 1)
assert.equal(all_files_recursive[0].path, file.path)
tear_down()
	//
// only the 1 txt file exists when using get_files_with_extension_recursive()
setup()
let all_files_with_txt_extension = test_data_dir.get_files_with_extension_recursive('txt')
assert.equal(all_files_with_txt_extension.length, 1)
assert.equal(all_files_with_txt_extension[0].path, file.path)
tear_down()

// no files with other file extensions()
setup()
let php_files = test_data_dir.get_files_with_extension_recursive('php')
assert.equal(php_files.length, 0)
let js_files = test_data_dir.get_files_with_extension_recursive('js')
assert.equal(js_files.length, 0)
tear_down()

// appended file not empty
setup()
assert.greater_than(file.size(), 0)
tear_down()

// file has the appended line
setup()
let lines = file.read_lines()
assert.equal(lines.length, 2)
assert.equal(lines[0], 'I am a line!')
tear_down()
