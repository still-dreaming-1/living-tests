"use strict"

const Shell = (object = {}) => {
	object.run = (command, args = null) => require('child_process').spawnSync(command, args)
	return object
}

module.exports = Shell
