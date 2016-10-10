const File = require('../../elhin/File')
const assert = require('chai').assert

describe('File', function() {
	context('2 parent directories before the root directory', function() {

		beforeEach(function() {
			this.file= File('/ok/whatever/some.txt')
		})

		describe('#path', function() {
			it('should be correct', function() {
				assert.equal('/ok/whatever/some.txt', this.file.path)
			})
		})

		describe('#name', function() {
			it('should be correct', function() {
				assert.equal('some.txt', this.file.name)
			})
		})

		describe('#name_without_extension', function() {
			it('', function() {
				assert.equal('some', this.file.name_without_extension)
			})
		})

		describe('#exists()', function() {
			it('should not be exist', function() {
				assert.equal(false, this.file.exists())
			})
		})

		describe('#extension', function() {
			it('should be txt', function() {
				assert.equal('txt', this.file.extension)
			})
		})
	})
})
