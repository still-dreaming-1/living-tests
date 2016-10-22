"use strict"
require('../elhin/String')
const Dir = require('../elhin/Dir')
const Living_tests = require('../Living_tests')
const assert = require('../assert')

// tests the Dir class

// Dir.path should not change when starts with forward slash
assert.equal(Dir('/i_am_the_path/').path, '/i_am_the_path/')

// Dir.path should be root when path is just a forward slash
let dir = Dir('/')
assert.equal(dir.path, '/')

// Dir.path should not remove / from the end
dir = Dir('/some/dir/')
assert.equal(dir.path, '/some/dir/')

// Dir.path should add / to end when it does not end with that
dir = Dir('/some/dir')
assert.equal(dir.path, '/some/dir/')

// Dir.name should not include the slash when path starts with slash
assert.equal(Dir('/i_am_the_name').name, 'i_am_the_name')

// Dir.name should be set correctly when provided a complex path
assert.equal(Dir('/i_am_the_parent/I am the name').name, 'I am the name')

// Dir.parent() should be the parent
assert.equal(Dir('/i_am_the_parent/made_up_non_existent_dir').parent().path, '/i_am_the_parent/')

// Dir.parent() should be null when the directory is root
assert.equal(Dir('/').parent(), null)

// Dir.parent() should be the parent if path was provided without a starting slash
assert.equal(Dir('i_am_the_parent/made_up_non_existent_dir').parent().path, 'i_am_the_parent/')

// Dir.parent() should be the parent even if the parent is only one character
assert.equal(Dir('~/made_up_non_existent_dir').parent().path, '~/')

// Dir.parent() should be null when no parent and passed path is only one character
assert.equal(Dir('~').parent(), null)

// Dir.parent() should be null when the passed path is dot
assert.equal(Dir('.').parent(), null)

// Dir.parent_is_dot should be dot slash when that is the parent
assert.equal(Dir('./some_dir').parent().path, './')

// Dir.exists() should exist when it is the root dir
dir = Dir('/')
assert.equal(dir.exists(), true)

// Dir.exists() should exist when it is the home directory
assert.equal(Dir('/home').exists(), true)

// Dir.exists() should not exist when it is a strangely named directory
assert.equal(Dir('/idonotexistanywhereatall').exists(), false)

// Dir.get_contained_dir() should have the correct path
dir = Dir('/some_dir')
let contained_dir = dir.get_contained_dir('inside')
assert.equal(contained_dir.path, '/some_dir/inside/')

// Dir.get_contained_file() should have the correct path
dir = Dir('/some_dir')
let contained_file = dir.get_contained_file('myfile.txt')
assert.equal(contained_file.path, '/some_dir/myfile.txt')

// Dir.subdir_of() is not a subdirectory of its parent when the parent does not exist
let mom = Dir('mommy')
let baby = mom.get_contained_dir('baby')
assert.equal(baby.is_subdir_of(mom), false)

// Dir.has_subdir() it does not have the subdirectory when it does not exist and therefore has no sub directories
mom = Dir('mommy')
baby = mom.get_contained_dir('baby')
assert.equal(mom.has_subdir(baby), false)

// Dir.is_subdir_of() it is false when parent has no dirs
let parent = Living_tests().dir.get_contained_dir('static test data')
assert.equal(parent.exists(), true)
let child = parent.get_contained_dir('I do not exist')
assert.equal(child.exists(), false)
assert.equal(child.is_subdir_of(parent), false)

// Dir.has_subdir() it is false when parent has no dirs
parent = Living_tests().dir.get_contained_dir('static test data')
assert.equal(parent.exists(), true)
child = parent.get_contained_dir('I do not exist')
assert.equal(child.exists(), false)
assert.equal(parent.has_subdir(child), false)

// Dir.is_subdir_of() child is not subdir of parent when parent only has other child dirs
parent = Living_tests().dir.get_contained_dir('static test data')
assert.equal(parent.exists(), true)
let non_existent_child = parent.get_contained_dir('I do not exist')
assert.equal(non_existent_child.exists(), false)
let real_child = parent.get_contained_dir('empty dir')
assert.equal(real_child.exists(), true)
assert.equal(non_existent_child.is_subdir_of(parent), false)

// Dir.has_subdir() parent not has subdir when only has other children
parent = Living_tests().dir.get_contained_dir('static test data')
assert.equal(parent.exists(), true)
non_existent_child = parent.get_contained_dir('I do not exist')
assert.equal(non_existent_child.exists(), false)
assert.equal(parent.has_subdir(non_existent_child), false)

// Dir.is_subdir_of() is_subdir_of is true when happy path
parent = Living_tests().dir.get_contained_dir('static test data')
assert.equal(parent.exists(), true)
child = parent.get_contained_dir('empty dir')
assert.equal(child.exists(), true)
assert.equal(child.is_subdir_of(parent), true)

// Dir.has_subdir() is true when happy path
parent = Living_tests().dir.get_contained_dir('static test data')
assert.equal(parent.exists(), true)
child = parent.get_contained_dir('empty dir')
assert.equal(child.exists(), true)
assert.equal(parent.has_subdir(child), true)

// Dir.get_relative_dir() returns the parent dir when provided a relative path with ../ to go up a directory
let living_tests = Living_tests()
let static_data_dir = living_tests.dir.get_contained_dir('static test data')
let living_tests_dir = static_data_dir.get_relative_dir('../')
assert.equal(living_tests_dir.path, living_tests.dir.path)

// Dir.get_relative_dir() it can return a dir under the same parent dir using ../ in the path
let test_dir = Living_tests().dir.get_contained_dir('test')
static_data_dir = test_dir.get_relative_dir('../static test data')
assert.equal(static_data_dir.path.endsWith('static test data/'), true)
assert.equal(static_data_dir.exists(), true)

// Dir.get_relative_dir() can go up more than one dir using ../
let integraion_dir = living_tests.dir.get_contained_dir('tests/integration')
assert.equal(integraion_dir.exists(), true)
assert.equal(integraion_dir.get_relative_dir('../../').path, living_tests.dir.path)

// contains_file_path_recursive() tests
let empty_file = static_data_dir.get_contained_file('empty file.txt')
assert.equal(living_tests.dir.contains_file_path_recursive(empty_file.path), true)
let non_existent_file = static_data_dir.get_contained_file('I do not exist.txt')
assert.equal(living_tests.dir.contains_file_path_recursive(non_existent_file.path), false)

// get_all_files() of empty dir
let empty_dir = static_data_dir.get_contained_dir('empty dir');
assert.equal(empty_dir.exists(), true)
assert.deep_equal(empty_dir.get_all_files(), [])
