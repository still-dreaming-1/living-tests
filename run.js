// #!/usr/bin/env node
"use strict"

// This file is not finished yet. You use it typing living-tests into the terminal. It will search the directory you
// started node from for a directory called 'tests'. It will then recursively run all the tests from all the .js.

let fs = require('fs')
let tests_dir_path = require('process').cwd() + '/tests'
let elhin = require('elhin')()
const tests_dir = elhin.Dir(tests_dir_path)
console.log('expected tests dir: ' + tests_dir.path)
tests_dir.get_files_with_extension_recursive('js')
