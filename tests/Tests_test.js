'use strict'

require('../elhin/Array')
const assert = require('../assert')
const Tests = require('../Tests')
const File = require('../elhin/File')

const living_tests_dir_path = require('../Living_tests')().dir.path
const tests = Tests(living_tests_dir_path)
const test_file_array = tests.collect_files()
assert.greater_than(test_file_array.length, 1)
assert.equal(test_file_array.containsTest(x => x.name === 'Tests_test.js'), true)
assert.equal(test_file_array.containsTest(x => x.name === 'Array_test.js'), true)
const result_array = tests.run()
assert.greater_than(result_array.length, 1)
assert.equal(result_array.containsTest(result => {
	return File(result.test_path).name === 'Tests_test.js'
		&& result.assertion_results.length === 1
		&& result.assertion_results[0] === true
		&& result.overall_result() === true
}), true)
