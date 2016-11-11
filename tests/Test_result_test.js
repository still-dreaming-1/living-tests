'use strict'

require('../elhin/Array')
const assert = require('../assert')
const Test_result = require('../Test_result')

const test_result = Test_result()
assert.equal(test_result.test_file, null)
assert.deep_equal(test_result.assertion_results, [])
assert.equal(test_result.overall_result(), false)

test_result.assertion_results.push(true)
assert.equal(test_result.assertion_results.length, 1)
assert.equal(test_result.overall_result(), true)

test_result.assertion_results.push(true)
assert.equal(test_result.assertion_results.length, 2)
assert.equal(test_result.overall_result(), true)

test_result.assertion_results.push(false)
assert.equal(test_result.assertion_results.length, 3)
assert.equal(test_result.overall_result(), false)
