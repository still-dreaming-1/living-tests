"use strict"

// This file is not finished yet. You use it by running node from the terminal and passing this file to it. It will search the directory you
// started node from for a directory called 'tests'. It will then recursively run all the tests from all the .js.

let testsDir= require('process').cwd() + '/tests'
let fs= require('fs')
