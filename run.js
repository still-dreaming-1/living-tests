// #!/usr/bin/env node
'use strict'

// This file is not finished yet. You use it typing living-tests into the terminal. It will search the directory you
// started node from for a directory called 'tests'. It will then recursively run all the tests from all the .js.
const Test_runner = require('./Test_runner.js')
const Living_tests = require('./Living_tests.js')
const test_runner = Test_runner(Living_tests().dir.path)
test_runner.run()

console.log('expected tests dir: ' + tests_dir.path)
