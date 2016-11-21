'use strict'

// when create() a txt file and copy_to() an existing subdir with the same file extension

const assert = require('../../../assert')
const File = require('../../../elhin/File')
require('../../../elhin/Array')
const Dir = require('../../../elhin/Dir')
const Living_tests = require('../../../Living_tests')


let test_data_dir = null
let created_file = null
let subdir = null
let copied_file = null
const Test_data_dir = () => {
	return Living_tests().dir.get_contained_dir('test data')
}

const setup = () => {
	tear_down_without_assertions_or_exceptions()
	test_data_dir = Test_data_dir()
	assert.equal(test_data_dir.exists(), false)
	test_data_dir.create()
	assert.equal(test_data_dir.exists(), true)
	subdir = test_data_dir.get_contained_dir('subdir')
	assert.equal(subdir.exists(), false)
	created_file = test_data_dir.get_contained_file('file.txt')
	assert.equal(created_file.exists(), false)
	created_file.create()
	assert.equal(created_file.exists(), true)
	copied_file = subdir.get_contained_file('copied file.txt')
	assert.equal(copied_file.exists(), false)
	created_file.copy_to(copied_file.path)
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

// the copied file exists
setup()
assert.equal(copied_file.exists(), true)
tear_down()

// only the original created txt files exists when using get_all_files()
setup()
let all_files_non_recursive = test_data_dir.get_all_files()
assert.equal(all_files_non_recursive.length, 1)
assert.equal(all_files_non_recursive.containsTest((x) => x.path === created_file.path), true)
tear_down()

// the subdirectory exists when using get_all_dirs()
setup()
let all_dirs_non_recursive = test_data_dir.get_all_dirs()
assert.equal(all_dirs_non_recursive.length, 1)
assert.equal(all_dirs_non_recursive[0].path, subdir.path)
tear_down()

// the subdirectory exists when using get_all_dirs_recursive()
setup()
let all_dirs_recursive = test_data_dir.get_all_dirs_recursive()
assert.equal(all_dirs_recursive.length, 1)
assert.equal(all_dirs_recursive[0].path, subdir.path)
tear_down()

// 2 txt files exist when using get_all_files_recursive()
setup()
let all_files_recursive = test_data_dir.get_all_files_recursive()
assert.equal(all_files_recursive.length, 2)
assert.equal(all_files_recursive.containsTest((x) => x.path === created_file.path), true)
assert.equal(all_files_recursive.containsTest((x) => x.path === copied_file.path), true)
tear_down()

// 2 txt files exist when using get_files_with_extension_recursive()
setup()
let all_files_with_txt_extension = test_data_dir.get_files_with_extension_recursive('txt')
assert.equal(all_files_with_txt_extension.length, 2)
assert.equal(all_files_with_txt_extension.containsTest((x) => x.path === created_file.path), true)
assert.equal(all_files_with_txt_extension.containsTest((x) => x.path === copied_file.path), true)
tear_down()

// no files with other file extensions()
setup()
let php_files = test_data_dir.get_files_with_extension_recursive('php')
assert.equal(php_files.length, 0)
let js_files = test_data_dir.get_files_with_extension_recursive('js')
assert.equal(js_files.length, 0)
tear_down()

// both files are empty
setup()
assert.equal(created_file.size(), 0)
assert.equal(copied_file.size(), 0)
tear_down()

// both files have no lines
setup()
assert.equal(created_file.read_lines().length, 0)
assert.equal(copied_file.read_lines().length, 0)
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
