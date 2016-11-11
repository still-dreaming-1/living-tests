'use strict'

const Shell = (object = {}) => {
	object.run = (command, args = [], options = { encoding: 'utf8' }) => {
		return require('child_process').spawnSync(command, args, options)
	}
	return object
}

module.exports = Shell
