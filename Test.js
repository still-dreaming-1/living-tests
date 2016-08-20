"use strict"

let test= (state={}) => {
	state._beforeEach= null;

	state.beforeEach= (fun) => {
		state._beforeEach= fun;
	}

	state.context= (description, fun) => {
		fun();
	}

	state.describe= (description, fun) => {
		fun();
	}

	state.it= (description, fun) => {
		if(state._beforeEach !== null)
			state._beforeEach();
		fun();
	}
}

module.exports= test
