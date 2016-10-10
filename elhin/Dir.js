"use strict"

const Dir = (path, object = {}) => {
	require('./String')
	const Shell = require('./Shell')
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
		try {
			const stats = fs.statSync(object.path)
			if(stats.isDirectory())
				return true
			return false
		} catch(e) {
			return false
		}
	}

	object.parent = () => {
		const lastSlashIdx = object.path.removeEnd().lastIndexOf('/')
		if(lastSlashIdx === -1)
			return null
		return Dir(object.path.substring(0, lastSlashIdx))
	}

	object.getContainedDir = name => Dir(object.path + name)

	object.get_relative_dir = (relativePath) =>  {
		if(relativePath.startsWith('../')) {
			if(relativePath.length > 3) {
				let parentRelativePath = relativePath.skip(3)
				return object.parent().get_relative_dir(parentRelativePath)
			} else
				return object.parent()
		}
		return object.getContainedDir(relativePath)
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
		let all_files = []
		for(let file of object.get_all_files())
			all_files.push(file)
		all_files.push.apply(object.get_all_files())
		for(let dir of object.get_all_dirs()) {
			for(let file of dir.get_all_files_recursive())
				all_files.push(file)
		}
		return all_files
	}

	object.get_all_dirs = () => {
		return fs.readdirSync(object.path)
			.map(name => object.path + name)
			.filter(path => fs.statSync(path).isDirectory())
			.filter(file_path => Dir(path))
	}

	object.get_all_dirs_recursive = () => {
		let all_dirs_recursive = []
		let all_dirs = object.get_all_dirs()
		all_dirs_recursive.push.apply(all_dirs)
		for(let dir in all_dirs)
			all_dirs_recursive.push.apply(dir.get_all_dirs_recursive())
		return all_dirs_recursive
	}

	// if this is too slow, can try rewriting to use find
	object.get_files_with_extension_recursive = extension => object.get_all_files_recursive().filter(file => file.extension === extension)

	object.create = () => {
		fs.mkdirSync(object.path)
	}

	object.copy_to = dir => {
		fs.copySync(object.path, dir.path)
	}

	object.delete = () => {
		fs.removeSync(object.path)
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
