'use strict'

const Position = (x = 0, y = 0, object = {}) => {
	object.x = x
	object.y = y
	return object
}

module.exports = Position
