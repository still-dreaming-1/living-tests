"use strict"

const repl = require('repl')
let Test= require('./Test.js')
let test= Test()
const beforeEach= test.beforeEach
const context= test.context
const describe= test.describe
const it= test.it
repl.start()
