// This is an example of how to write a test for living-tests. I am using living-tests to test itself, or in this case, to test the concept / instructions for writing these tests

// you will need this require in your own tests, but yours can be simpler. You can just use "const assert = require('living-tests')".
const assert = require('../assert')

// create the main variables used by the tests and setup by the setup function here
let five = null
// create a setup function that you will call before tests that need to be setup
const setup = () => {
	five = 5
}
// you can create a tear_down() function here if you tests need one. These tests don't need that

// Unlike other testing frameworks, you don't pass a description of what you are testing. For now just use comments for that:

// test setup and assert.equal
setup()
assert.equal(5, five)
five = 10
// Call the tear_down() function here if you have one. These tests don't have one.

// even though the previous test set five to 10, it should be back to 5 here, unless you forget to call the setup function
setup()
assert.equal(5, five)
// Call the tear_down() function here if you have one. These tests don't have one.
