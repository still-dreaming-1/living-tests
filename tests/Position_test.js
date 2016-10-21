"use strict"
const assert = require('../assert')

// testing String monkey patch / extension methods
const Position = require('../elhin/Position')

let position = Position()
assert.equal(position.x, 0)
assert.equal(position.y, 0)

position = Position()
position.x = 10;
assert.equal(position.x, 10)
assert.equal(position.y, 0)

position = Position()
position.y = 3;
assert.equal(position.x, 0)
assert.equal(position.y, 3)

position = Position()
position.x = 2;
assert.equal(position.x, 2)
position.y = 3;
assert.equal(position.y, 3)
assert.equal(position.x, 2)
position.x = 5;
assert.equal(position.y, 3)
