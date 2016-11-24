#!/usr/bin/env node
'use strict'

// You use it typing living-tests into the terminal. It will asume the directory you started it from is the your project directory. It looks for a directory called tests and
// recusrively runs all the .js files inside it as if they were tests.
const runner = require('./Runner')()
runner.run()
