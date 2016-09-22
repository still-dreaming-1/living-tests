// This is an example of how to write a test for living-tests. I am using living-tests to test itself, or in this case, to test the concept / instructions for writing these tests

// you will need this require in your own tests, but yours can be simpler. You can just use "let assert= require('living-tests')".
let assert= require('../assert') 

// create a setup function that you will call before tests that need to be setup
let setup= () => {
	this.five= 5 // For variables that need to be setup add them to "this". This prevents duplication from having to create variables above this function and then setting them inside
}

// manually call setup() before tests that need to be setup. It is up to you, to write setup() in such a way that it will ensure all your tests run the same.
// Unlike other testing frameworks, you don't pass a description of what you are testing. For now just use comments for that:

// test setup
setup()
assert.equal(5, this.five)
this.five= 10

// even though the previous test set this.five to 10, it should be back to 5 here
setup()
assert.equal(5, this.five)
