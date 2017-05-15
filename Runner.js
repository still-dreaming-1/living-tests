'use strict'

const Runner = (object = {}) => {
	object.living_tests = require('./Living_tests')()

	object.run = () => {
		const tests = object.living_tests.Tests(object.living_tests.elhin.Dir(process.cwd()))

		const test_file_array = tests.collect_files()
		const test_result_array = tests.run(test_file_array)

        // yes this is a badly named variable, but console is already taken
		const my_console = object.living_tests.elhin.Console()
		for(let test_result of test_result_array) {
			if(test_result.overall_result()) {
				my_console.log('pass: ' + test_result.test_file.path)
			} else {
				my_console.log('fail: ' + test_result.test_file.path)
                let fail_output = ''
                for(let output of test_result.shell_result.output) {
                    output = String(output)
                    if(output.length > 0) {
                        fail_output = fail_output + output
                    }
                }
				my_console.log(fail_output)
				process.exit()
			}
		}
		my_console.log()
		my_console.log(require('./assert').pass_string)
	}
	return object
}

module.exports = Runner
