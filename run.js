#!/usr/bin/env node
'use strict'

// You use it typing living-tests into the terminal. It will asume the directory you started it from is the your project directory. It looks for a directory called tests and
// recusrively runs all the .js files inside it as if they were tests.
const Dir = require('./elhin/Dir')
const tests = require('./Tests.js')(Dir(process.cwd()))
const test_file_array = tests.collect_files()
const test_result_array = tests.run(test_file_array)
for(let test_result of test_result_array) {
	if(test_result.overall_result()) {
		console.log('pass: ' + test_result.test_file.path)
	} else {
		console.log('fail: ' + test_result.test_file.path)
		console.log(test_result)
		process.exit()
	}
}
console.log()
console.log('✔')
