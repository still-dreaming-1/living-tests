# living-tests [![Join the chat at https://gitter.im/still-dreaming-1/living-tests](https://badges.gitter.im/still-dreaming-1/living-tests.svg)](https://gitter.im/still-dreaming-1/living-tests?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Bring your Node.js tests alive with living-tests.

Warning! This workflow is so awesomely powerful that it is dangerous! It's like a machine gun with the trigger stuck so it repeatedly fires everywhere you point it! Writing your tests and running your tests becomes the same thing, before you even save, with every keystroke. If you are testing working with file systems, sending email, or anything that can change the world, just writing the tests can do great damage, so use with caution. You might even kick off multiple services or other long running processes before the first one finishes. It might be possible to create memory leaks or race conditions from not closing resources properly.

The way you write and run your tests makes it possible to have a live coding experience while you edit your tests. You will see very short error messages appear just to right of failing assertions. You have to use Vim or Neovim as your editor with the codi.vim plugin to get this experience.

The way you write your test code will be a little different than other testing frameworks. You won't create functions or methods or closures with your assertions inside them. All your test code and assertions are written outside of any functions. This is necessary in order to get the live experience.

Instructions:

These instructions explain a combination of tools you can use to get this live testing experience.

* Install Vim or Neovim if you don't already have one installed. Personally, I much prefer Neovim over Vim, but either one works for this. If you don't already know how to use Vim, trying to do live testing in it immediately is not a good place to start. Learn at least the basics of Vim first.

* Install the codi.vim Vim/Neovim plugin.

* install living-tests as a node package using npm: `npm install -g still-dreaming-1/living-tests`

* Create a test file ending with the .js file extension. Your intention might to be to write unit tests, integration tests, etc. Don't start writing any code yet.

* Make sure you have that empty test file open in Vim and run the `:Codi` command from Vim. This will run everything in your current file through the node REPL. As you start typing code into the file, everything you write will be instantly run through the REPL, so it will be executing as you type, before you even save. Be careful what you type.

* Add this line to the top of each test file: `let assert = require('living-tests')`. Create a setup() function right there in your test file that will setup each test. It probably should not take any parameters, but I guess it could if you really want it to. Call it as necessary before each test. The setup() function is not part of any framework or library, you could technically name it whatever you want. It is just a function you are creating and calling. Other than the setup function, keep all your test code outside of any functions. That is the key to getting the live testing experience. Make all your assertions using `assert.equal(actual, expected)`, or `assert.deep_equal(actual, expected)`. Those are both strict equality assertions. They will ensure you see a check mark next to passing assertions. Use a single blank line to visually separate each test. Your tests are not going to run isolated like they would in other testing frameworks. It is up to you to make sure any shared state between tests gets reset inside your setup() function. You actually don't need to make a setup() function if your tests don't share state.

* It is also important to at times run all the tests from your entire project at once, however there is no live programming support for that feature. To do this, make sure all your living tests are inside a 'tests' directory inside your project root directory. Then, from your terminal, navigate to the root directory of your project and enter the command 'living-tests'.

* Have fun writing / running your tests! You should see exception messages just to right of failing assertions and checkmarks for passing ones.
