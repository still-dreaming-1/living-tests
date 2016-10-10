"use strict"

// non-empty file

const assert = require('../../assert')
const File = require('../../elhin/File')
const Position = require('../../elhin/Position')
const Living_tests = require('../../Living_tests')

let static_data_dir = null
let file = null
const setup = () => {
	static_data_dir = Living_tests().dir.getContainedDir('static test data')
	file = static_data_dir.get_contained_file('non_empty_php_file.php')
}

setup()
assert.equal(file.exists(), true)

// file is not empty
setup()
assert.equal(file.size() > 0, true)
assert.equal(0 < file.read_lines().length, true)

// the file contains the lines it should have
setup()
let lines = file.read_lines()
assert.equal(lines[0], '<?')
assert.equal(lines[1], 'class non_empty_php_file {')
assert.equal(lines[2], '}')

// parent dir contains_file_path_recursive()
setup()
assert.equal(static_data_dir.contains_file_path_recursive(file.path), true)

setup()
assert.deep_equal(file.find_all('<'), [Position(1, 1)])

// find_all() for char only on line 1
setup()
assert.deep_equal(file.find_all('?'), [Position(2, 1)])

// find_all() for char only on line 2
setup()
assert.deep_equal(file.find_all('{'), [Position(26, 2)])

// find_all() for char only on last line
setup()
assert.deep_equal(file.find_all('}'), [Position(1, 3)])

// find_all() when found twice
setup()
let pos_list = file.find_all('s')
assert.equal(pos_list.length, 2)
let pos = pos_list[0]
assert.equal(pos.y, 2)
assert.equal(pos.x, 4)
pos = pos_list[1]
assert.equal(pos.y, 2)
assert.equal(pos.x, 5)
