'use strict'

// when create() a directory

const assert = require('../../../assert')
const Dir = require('../../../elhin/File')
const Living_tests = require('../../../Living_tests')

let test_data_dir = null
const Test_data_dir = () => {
	return Living_tests().dir.get_contained_dir('test data')
}

const setup = () => {
	tear_down_without_assertions_or_exceptions()
	test_data_dir = Test_data_dir()
	assert.equal(test_data_dir.exists(), false)
	test_data_dir.create()
}

const tear_down_without_assertions_or_exceptions = () => {
	test_data_dir = Test_data_dir()
	test_data_dir.delete_if_exists()
}

// the directory should exist
setup()
assert.equal(test_data_dir.exists(), true)
tear_down_without_assertions_or_exceptions()

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
assert.equal(test_data_dir.delete_if_exists(), false)
assert.equal(test_data_dir.exists(), false)
tear_down_without_assertions_or_exceptions()
