const File = require('../../elhin/File')
const assert = require('chai').assert

describe('File', function() {
	context('File when the parent directory is not the root directory', function() {

		beforeEach(function() {
			this.file= File('/whatever/some.txt')
		})

		describe('#path', function() {
			it('should be correct', function() {
				assert.equal('/whatever/some.txt', this.file.path)
			})
		})

		describe('#name', function() {
			it('should be correct', function() {
				assert.equal('some.txt', this.file.name)
			})
		})

		describe('#name_without_extension', function() {
			it('should be correct', function() {
				assert.equal('some', this.file.name_without_extension)
			})
		})

		describe('#exists()', function() {
			it('should not exist', function() {
				assert.equal(false, this.file.exists())
			})
		})

		describe('#extension', function() {
			it('should be correct', function() {
				assert.equal('txt', this.file.extension)
			})
		})
	})
})
