"use strict"
const assert = require('../assert')
const File = require('../elhin/File')
const Position = require('../elhin/Position')
const Living_tests = require('../Living_tests')

let static_data_dir = Living_tests().dir.get_contained_dir('static test data')
assert.equal(static_data_dir.exists(), true)

let non_existent_file_with_1_extension_char = File('/yay/I have an extension.c')
assert.equal(non_existent_file_with_1_extension_char.path, '/yay/I have an extension.c')
assert.equal(non_existent_file_with_1_extension_char.extension, 'c')
assert.equal(non_existent_file_with_1_extension_char.name_without_extension, 'I have an extension')
assert.equal(non_existent_file_with_1_extension_char.exists(), false)
let non_existent_file_with_2_extension_chars = File('/whatever/some.js')
assert.equal(non_existent_file_with_2_extension_chars.path, '/whatever/some.js')
assert.equal(non_existent_file_with_2_extension_chars.extension, 'js')
assert.equal(non_existent_file_with_2_extension_chars.name_without_extension, 'some')
assert.equal(non_existent_file_with_2_extension_chars.exists(), false)
let non_existent_file_with_3_extension_chars = File('/some/file/path.txt')
assert.equal(non_existent_file_with_3_extension_chars.path, '/some/file/path.txt')
assert.equal(non_existent_file_with_3_extension_chars.extension, 'txt')
assert.equal(non_existent_file_with_3_extension_chars.name_without_extension, 'path')
assert.equal(non_existent_file_with_3_extension_chars.exists(), false)
let non_existent_file_without_extension = File('/whatever/some')
assert.equal(non_existent_file_without_extension.path, '/whatever/some')
assert.equal(non_existent_file_without_extension.extension, '')
assert.equal(non_existent_file_without_extension.name_without_extension, 'some')
assert.equal(non_existent_file_without_extension.exists(), false)

let empty_file = static_data_dir.get_contained_file('empty file.txt')
assert.equal(empty_file.exists(), true)
assert.equal(empty_file.size(), 0)
assert.equal(empty_file.read_lines().length, 0)
assert.equal(empty_file.find_all('class').length, 0)

let non_empty_file = static_data_dir.get_contained_file('non_empty_php_file.php')
assert.equal(non_empty_file.exists(), true)
assert.equal(non_empty_file.size(), 32)

let lines = non_empty_file.read_lines()
assert.equal(lines.length, 4)
assert.equal(lines[0], '<?')
assert.equal(lines[1], 'class non_empty_php_file {')
assert.equal(lines[2], '}')
assert.equal(lines[3], '')
assert.deep_equal(non_empty_file.find_all('<'), [Position(1, 1)])
assert.deep_equal(non_empty_file.find_all('?'), [Position(2, 1)])
assert.deep_equal(non_empty_file.find_all('{'), [Position(26, 2)])
assert.deep_equal(non_empty_file.find_all('}'), [Position(1, 3)])

let s_position_array = non_empty_file.find_all('s')
assert.equal(s_position_array.length, 2)
assert.equal(s_position_array[0].y, 2)
assert.equal(s_position_array[0].x, 4)
assert.equal(s_position_array[1].y, 2)
assert.equal(s_position_array[1].x, 5)

assert.deep_equal(non_empty_file.find_all('ss'), [Position(4, 2)])
assert.deep_equal(non_empty_file.find_all('class'), [Position(1, 2)])
