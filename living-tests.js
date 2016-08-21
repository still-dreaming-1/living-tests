"use strict"

const repl = require('repl')
let Test= require('./Test.js')
let test= Test()
let replServer= repl.start()
replServer.beforeEach= test.beforeEach
replServer.context= test.context
replServer.describe= test.describe
replServer.it= test.it
