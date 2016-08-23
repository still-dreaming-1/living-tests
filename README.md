# living-tests [![Join the chat at https://gitter.im/still-dreaming-1/living-tests](https://badges.gitter.im/still-dreaming-1/living-tests.svg)](https://gitter.im/still-dreaming-1/living-tests?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Bring your Node.js tests alive with living-tests.

Warning! This workflow is so awesomely powerful that it is dangerous! It's like a machine gun with the trigger stuck so it repeatedly fires everywhere you point it! Writing your tests and running your tests becomes the same thing, before you even save, with every keystroke. If you are testing working with file systems, sending email, or anything that can change the world, just writing the tests can do great damage, so use with caution. You might even kick off multiple services or other long running processes before the first one finishes. It might be possible to create memory leaks or race conditions from not closing resources properly.

Only the proof of concept is working so far. It is not a framework or CLI tool yet meaning there is not way to say "Run all the tests in all my test files and show me an overall pass or fail". But it will give you live feedback for the test you are writing, which is extremely useful.

The way you write and run your tests makes it possible to have a live coding experience while you edit your tests. You will see very short error messages appear just to right of failing assertions. You have to use Vim or Neovim as your editor with the codi.vim plugin to get this experience.

The way you write your test code will be a little different than other testing frameworks. You won't create functions or methods or closures with your assertions inside them. All your test code and assertions are written outside of any functions. This is necessary in order to get the live experience.

Instructions:

These instructions explain a combination of tools you can use to get this live testing experience.

* Install Vim or Neovim if you don't already have one installed. Personally, I much prefer Neovim over Vim, but either one works for this. If you don't already know how to use Vim, trying to do live testing in it immediately is not a good place to start. Learn at least the basics of Vim first.

* Install the codi.vim Vim/Neovim plugin.

* install living-tests as a node package using npm: `npm install -g still-dreaming-1/living-tests`

* Create a test file ending with the .js file extension. Your intention might to be to write unit tests, integration tests, etc. Don't start writing any code yet.

* Make sure you have that empty test file open in Vim and run the `:Codi` command from Vim. This will run everything in your current file through the node REPL. As you start typing code into the file, everything you write will be instantly run through the REPL, so it will be executing as you type, before you even save. Be careful what you type.

* Look at the tests/Test_test.js file of this repository for an example and explanation of how to setup your test files and how to write tests in them. The concepts should seem familiar to you if you have used other testing frameworks, but the look of the code is still fairly unique because your code is not inside of functions or closures. You will have to do one thing differently from that example; All the code from the first line through the line where the livingTests variable is created can be replaced with a single line: `let livingTests= require('living-tests')`

* Have fun writing / running your tests! You should see exception messages just to right of failing assertions.
