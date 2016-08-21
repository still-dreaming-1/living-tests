// test setup code that will appear at the top of every test file
let pathToTest= ''
if(typeof __dirname === 'undefined') { // code directly entered into REPL
	pathToTest= './Test.js'
} else {
	pathToTest= '../Test.js'
}
let Test= require(pathToTest)
let test= Test()
const beforeEach= test.beforeEach
const spec= test.spec
// variables used throughout the test should be attached to this state object. "this" can change meaning in different contexts, I'm more comfortable using a state object like so:
let state= {}

beforeEach(() => {
	state.five= 5
})

// each test case begins with a call to spec(). For now this just calls beforeEach so that each test will run the same. It is up to you, to write beforeEach() in such a way that it will
// ensure all your tests run the same. Unlike other testing frameworks, you don't pass a description of what you are testing, for now just use comments for that:

// beforeEach should be called at the start of each test
spec()
assert.equal(5, state.five)
state.five= 10

// even though the previous test set state.five to 10, it should be back to 5 here
spec()
assert.equal(5, state.five)
