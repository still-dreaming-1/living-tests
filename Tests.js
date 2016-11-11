'use strict'
const Dir = require('./elhin/Dir')
const Test_result = require('./Test_result')
const shell = require('./elhin/Shell')()

const Tests = (project_path, object = {}) => {
	object.collect_files = () => {
		const test_dir = Dir(project_path).get_contained_dir('tests')
		return test_dir.get_files_with_extension_recursive('js')
	}
	object.run = (test_file_array) => {
		const test_result_array = []
		for(let test_file of test_file_array) {
			const test_result = Test_result()
			test_result.test_file = test_file
			let shell_result = shell.run('node', [test_file.path])
			test_result.assertion_results.push(shell_result.status === 0)
			test_result_array.push(test_result)
		}
		return test_result_array
	}
	return object
}

module.exports = Tests
