"use strict"
const assert = require('../assert')

// testing Array monkey patch / extension methods
require('../elhin/Array')

// containsTest()
let empty_array = []
assert.equal(empty_array.containsTest(() => false), false)
assert.equal(empty_array.containsTest(() => true), false) // empty arrays never contain
let array_with_true = [true]
let array_with_false = [false]
assert.equal(array_with_true.containsTest(() => false), false)
assert.equal(array_with_false.containsTest(() => false), false)
assert.equal(array_with_true.containsTest(() => true), true)
assert.equal(array_with_false.containsTest(() => false), false)
let fred = { name: 'fred' }
let array_with_fred = [fred]
assert.equal(array_with_fred.containsTest((x) => x.name === 'fred'), true)
assert.equal(array_with_fred.containsTest((x) => x.name === 'sally'), false)
let sally = { name: 'sally' }
let array_with_fred_and_sally = [fred, sally]
assert.equal(array_with_fred_and_sally.containsTest((x) => x.name === 'fred'), true)
assert.equal(array_with_fred_and_sally.containsTest((x) => x.name === 'sally'), true)
