const File= require('../../elhin/File')
const assert = require('chai').assert

describe('File', function() {
	context('has no extension', function() {

		beforeEach(function() {
			this.file= File('/whatever/some')
		})

		describe('#path', function() {
			it('should be correct', function() {
				assert.equal('/whatever/some', this.file.path)
			})
		})

		describe('#name', function() {
			it('should be correct', function() {
				assert.equal('some', this.file.name)
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
				assert.equal('', this.file.extension)
			})
		})
	})
})
