'use strict'
// this test file is not inside the tests directory because that would cause infinite recursion of testing

require('./elhin/Array')
const assert = require('./assert')
const Tests = require('./Tests')
const File = require('./elhin/File')

const living_tests_dir = require('./Living_tests')().dir
const tests = Tests(living_tests_dir)
const test_file_array = tests.collect_files()
assert.greater_than(test_file_array.length, 1)
assert.equal(test_file_array.containsTest(x => x.name === 'Test_result_test.js'), true)
assert.equal(test_file_array.containsTest(x => x.name === 'Array_test.js'), true)
const result_array = tests.run(test_file_array)
// test_file_array[0].path
assert.greater_than(result_array.length, 0)
assert.equal(result_array.containsTest(result => {
	return result.test_file.name === 'Test_result_test.js'
		&& result.assertion_results.length === 1
		&& result.assertion_results[0] === true
		&& result.overall_result() === true
}), true)
