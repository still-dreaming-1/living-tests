"use strict"

let test= (state={}) => {
	state._beforeEach= null

	state.beforeEach= (fun) => {
		state._beforeEach= fun;
	}

	state.spec= () => {
		if(state._beforeEach !== null)
			state._beforeEach()
	}
	return state
}

module.exports= test
