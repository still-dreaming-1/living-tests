const File = require('../../elhin/File')
const assert = require('chai').assert

describe('File', function() {
	context('extension has 1 character', function() {

		beforeEach(function() {
			this.file= File('/yay/I have an extension.c')
		})

		describe('#path', function() {
			it('should be correct', function() {
				assert.equal('/yay/I have an extension.c', this.file.path)
			})
		})

		describe('#name', function() {
			it('should be correct', function() {
				assert.equal('I have an extension.c', this.file.name)
			})
		})

		describe('#name_without_extension', function() {
			it('should be correct', function() {
				assert.equal('I have an extension', this.file.name_without_extension)
			})
		})

		describe('#exists()', function() {
			it('should not exist', function() {
				assert.equal(false, this.file.exists())
			})
		})

		describe('#extension', function() {
			it('should be c', function() {
				assert.equal('c', this.file.extension)
			})
		})
	})
})
