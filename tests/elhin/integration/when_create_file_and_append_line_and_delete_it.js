'use strict'

// when create() a file and append_line() to it and delete() it

const assert = require('../../../assert')
const File = require('../../../elhin/File')
const Living_tests = require('../../../Living_tests')

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
	let lines = file.read_lines()
	assert.equal(lines.length, 2)
	assert.equal(lines[0], 'I am a line!')
	assert.equal(lines[1], '') // this blank line exists because append_line() always adds a new line character
	file.delete()
}

const tear_down_without_assertions_or_exceptions = () => {
	test_data_dir = Test_data_dir()
	test_data_dir.delete_if_exists()
}

const tear_down = () => {
	test_data_dir = Test_data_dir()
	test_data_dir.delete_if_exists()
	assert.equal(test_data_dir.exists(), false)
}

// the file does not exist
setup()
assert.equal(file.exists(), false)
tear_down()

// no files exist when using get_all_files()
setup()
let all_files_non_recursive = test_data_dir.get_all_files()
assert.equal(all_files_non_recursive.length, 0)
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

// no files exists when using get_all_files_recursive()
setup()
let all_files_recursive = test_data_dir.get_all_files_recursive()
assert.equal(all_files_recursive.length, 0)
tear_down()

// no txt files exist when using get_files_with_extension_recursive()
setup()
let all_files_with_txt_extension = test_data_dir.get_files_with_extension_recursive('txt')
assert.equal(all_files_with_txt_extension.length, 0)
tear_down()

// no files with other file extensions
setup()
let php_files = test_data_dir.get_files_with_extension_recursive('php')
assert.equal(php_files.length, 0)
let js_files = test_data_dir.get_files_with_extension_recursive('js')
assert.equal(js_files.length, 0)
tear_down()

// can Dir.delete() the dir
setup()
assert.equal(test_data_dir.exists(), true)
test_data_dir.delete()
assert.equal(test_data_dir.exists(), false)
tear_down_without_assertions_or_exceptions()

// Dir.delete_if_exists() deletes the dir
setup()
assert.equal(test_data_dir.exists(), true)
assert.equal(test_data_dir.delete_if_exists(), true)
assert.equal(test_data_dir.exists(), false)
tear_down_without_assertions_or_exceptions()
