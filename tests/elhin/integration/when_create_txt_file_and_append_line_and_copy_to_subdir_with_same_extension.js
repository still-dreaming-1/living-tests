'use strict'

// when create() a txt file and append_line() and copy_to() subdir with the same file extension

const assert = require('../../../assert')
const File = require('../../../elhin/File')
require('../../../elhin/Array')
const Dir = require('../../../elhin/Dir')
const Living_tests = require('../../../Living_tests')

let test_data_dir = null
let test_data_subdir = null
let created_file = null
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
	test_data_subdir = test_data_dir.get_contained_dir('subdir')
	assert.equal(test_data_subdir.exists(), false)
	test_data_subdir.create()
	assert.equal(test_data_subdir.exists(), true)
	created_file = test_data_dir.get_contained_file('file.txt')
	assert.equal(created_file.exists(), false)
	created_file.create()
	assert.equal(created_file.exists(), true)
	created_file.append_line('added this line')
	let lines = created_file.read_lines()
	assert.equal(lines.length, 2)
	assert.equal(lines[0], 'added this line')
	assert.equal(lines[1], '')
	copied_file = test_data_subdir.get_contained_file('copied file.txt')
	assert.equal(copied_file.exists(), false)
	created_file.copy_to(copied_file.path)
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

// the copied file exists
setup()
assert.equal(copied_file.exists(), true)
tear_down()

// only the original txt files exist when using get_all_files()
setup()
let all_files_non_recursive = test_data_dir.get_all_files()
assert.equal(all_files_non_recursive.length, 1)
assert.equal(all_files_non_recursive.containsTest((x) => x.path === created_file.path), true)
tear_down()

// the subdir exists when using get_all_dirs()
setup()
let all_dirs_non_recursive = test_data_dir.get_all_dirs()
assert.equal(all_dirs_non_recursive.length, 1)
assert.equal(all_dirs_non_recursive.containsTest((x) => x.path === test_data_subdir.path && x.parent().path === test_data_dir.path), true)
tear_down()

// the subdir exists when using get_all_dirs_recursive()
setup()
let all_dirs_recursive = test_data_dir.get_all_dirs_recursive()
assert.equal(all_dirs_recursive.length, 1)
assert.equal(all_dirs_recursive.containsTest((x) => x.path === test_data_subdir.path && x.parent().path === test_data_dir.path), true)
tear_down()

// 2 txt files exists when using get_all_files_recursive()
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

// neither file is empty
setup()
assert.greater_than(created_file.size(), 0)
assert.greater_than(copied_file.size(), 0)
tear_down()

// both files have the lines
setup()
let created_file_lines = created_file.read_lines()
let copied_file_lines = copied_file.read_lines()
assert.equal(created_file_lines.length, 2)
assert.equal(copied_file_lines.length, 2)
assert.equal(created_file_lines[0], 'added this line')
assert.equal(copied_file_lines[0], 'added this line')
assert.equal(created_file_lines[1], '')
assert.equal(copied_file_lines[1], '')
tear_down()
