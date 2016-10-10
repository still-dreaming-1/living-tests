const File = require('../../elhin/File')
const assert = require('chai').assert

describe('File', function() {
	context('extension has 2 characters', function() {

		beforeEach(function() {
			this.file= File('/whatever/some.js')
		})

		describe('#path', function() {
			it('should be correct', function() {
				assert.equal('/whatever/some.js', this.file.path)
			})
		})

		describe('#name', function() {
			it('should be correct', function() {
				assert.equal('some.js', this.file.name)
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
				assert.equal('js', this.file.extension)
			})
		})
	})
})
