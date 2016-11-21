'use strict'

const Dir = (path, object = {}) => {
	require('./String')
	const File = require('./File')
	const fs = require('fs-extra')

	object.path = path
	if(!object.path.endsWith('/'))
		object.path = object.path + '/'
	object.name = ''
	if(object.path.length > 1) {
		object.name = object.path.removeEnd().afterLast('/')
		if(object.name === '')
			object.name = object.path.removeEnd()
	}

	object.exists = () => {
		let stats = null
		try {
			stats = fs.statSync(object.path)
		} catch(e) {
			return false
		}
		if(stats.isDirectory())
			return true
		return false
	}

	object.parent = () => {
		const lastSlashIdx = object.path.removeEnd().lastIndexOf('/')
		if(lastSlashIdx === -1)
			return null
		return Dir(object.path.substring(0, lastSlashIdx))
	}

	object.get_contained_dir = name => Dir(object.path + name)

	object.get_relative_dir = (relativePath) =>  {
		if(relativePath.startsWith('../')) {
			if(relativePath.length > 3) {
				let parentRelativePath = relativePath.skip(3)
				return object.parent().get_relative_dir(parentRelativePath)
			} else
				return object.parent()
		}
		return object.get_contained_dir(relativePath)
	}

	object.get_contained_file = (name) => File(object.path + name)

	object.contains_file_path_recursive = path => {
		let file = File(path)
		return file.path.startsWith(path) && file.exists()
	}

	object.get_all_files = () => {
		return fs.readdirSync(object.path)
			.map(name => object.path + name)
			.filter(path => fs.statSync(path).isFile())
			.map(file_path => File(file_path))
	}

	object.get_all_files_recursive = () => {
		let all_files = object.get_all_files()
		for(let dir of object.get_all_dirs())
			all_files = all_files.concat(dir.get_all_files_recursive())
		return all_files
	}

	object.get_all_dirs = () => {
		return fs.readdirSync(object.path)
			.map(name => object.path + name)
			.filter(path => fs.statSync(path).isDirectory())
			.map(dir_path => Dir(dir_path))
	}

	object.get_all_dirs_recursive = () => {
		let all_dirs_recursive = []
		let all_dirs = object.get_all_dirs()
		all_dirs_recursive.push.apply(all_dirs)
		for(let dir of all_dirs)
			all_dirs_recursive = all_dirs_recursive.concat(dir, dir.get_all_dirs_recursive())
		return all_dirs_recursive
	}

	// if this is too slow, can try rewriting to use find
	object.get_files_with_extension_recursive = extension => object.get_all_files_recursive().filter(file => file.extension === extension)

	object.create = () => {
		fs.mkdirSync(object.path)
	}

	object.delete = () => {
		fs.removeSync(object.path)
	}

	object.delete_if_exists = () => {
		if(object.exists()) {
			object.delete()
			return true
		}
		return false
	}

	object.is_subdir_of = dir => dir.has_subdir(Dir(object.path))

	object.has_subdir = (dir) => {
		if(!object.exists())
			return false
		if(!dir.exists())
			return false
		if(dir.path.startsWith(object.path))
			return true
		return false
	}

	return object
}

module.exports = Dir
