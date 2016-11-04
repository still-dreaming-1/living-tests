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
	if(test_data_dir.exists())
		test_data_dir.delete()
}

const tear_down = () => {
	test_data_dir = Test_data_dir()
	if(test_data_dir.exists())
		test_data_dir.delete()
	assert.equal(test_data_dir.exists(), false)
}

// the directory should exist
setup()
assert.equal(test_data_dir.exists(), true)
tear_down()
