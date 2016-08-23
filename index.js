// Interface into the rest of the system. Just by requiring this one module, you can get access to the rest of the
// API
let livingTests= (state={}) => {
	state.assert= require('./assert')
	state.test= require('./test')
	return state
}
module.exports= livingTests()
