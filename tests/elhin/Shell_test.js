'use strict'
const assert = require('../../assert')
const Shell = require('../../elhin/Shell')

const shell = Shell()
const shell_result = shell.run('ls')
assert.equal(shell_result.status, 0)
