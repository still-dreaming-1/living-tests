'use strict'

const Runner = (object = {}) => {
	object.living_tests = require('./Living_tests')()

	object.run = () => {
		const tests = object.living_tests.Tests(object.living_tests.elhin.Dir(process.cwd()))

		const test_file_array = tests.collect_files()
		const test_result_array = tests.run(test_file_array)

		const con = object.living_tests.elhin.Console()
		for(let test_result of test_result_array) {
			if(test_result.overall_result()) {
				con.log('pass: ' + test_result.test_file.path)
			} else {
				con.log('fail: ' + test_result.test_file.path)
				con.log(test_result)
				process.exit()
			}
		}
		con.log()
		con.log(require('./assert').pass_string)
	}
	return object
}

module.exports = Runner
