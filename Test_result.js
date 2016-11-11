'use strict'
const Test_result = (object = {}) => {
	object.test_file = null
	object.assertion_results = []
	object.overall_result = () => {
		if(object.assertion_results.length === 0)
			return false
		for(let result of object.assertion_results) {
			if(!result)
				return false
		}
		return true
	}
	return object
}

module.exports = Test_result
