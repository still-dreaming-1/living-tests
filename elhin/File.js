'use strict'

const File = (path, object = {}) => {
	require('./String')
	const Position  = require('./Position')
	const fs = require('fs-extra')

	object.path = path
	object.extension = path.afterLast('.')
	object.name = path.afterLast('/')
	object.name_without_extension = object.name.beforeLast('.')

	object.exists = () => {
		try {
			let stats = fs.statSync(object.path)
			if(stats.isFile())
				return true
			return false
		} catch(e) {
			return false
		}
	}

	object.create = () => {
		let fd = fs.openSync(object.path, 'a')
		fs.closeSync(fd)
	}

	object.delete = () => {
		fs.removeSync(object.path)
	}

	object.copy_to = path => {
		fs.copySync(object.path, path)
	}

	object.size = () => {
		return fs.statSync(object.path).size
	}

	object.append_line = (str, encoding = 'utf-8', line_ending = '\n') => {
		return fs.writeFileSync(object.path, str + line_ending,
			{
				flag : 'a',
				encoding : encoding
			});
	}

	// returns an array of lines
	object.read_lines = (line_ending = '\n', encoding = { encoding: 'utf8' }) => {
		let fileData = fs.readFileSync(object.path, encoding)
		if(fileData.length === 0)
			return []
		return fileData.split(line_ending)
	}

	// searches for all occurances of needle in the file contents. needle is not treated as a regular expression
	// returns an array of Positions
	object.find_all = needle => {
		let pos_array = []
		let y = 0
		for(let line of object.read_lines()) {
			let start = 0
			y = y + 1
			let x = 0
			while(x < line.length) {
				x = line.indexOf(needle, start)
				if(x >= 0)
					pos_array.push(Position(x + 1, y))
				else
					break
				start = x + 1
			}
		}
		return pos_array
	}

	return object
}

module.exports = File
