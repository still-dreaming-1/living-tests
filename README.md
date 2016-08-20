# test-alive
Bring your JavaScript tests to life.

The way this runs tests makes it possible to have a live coding experience while you edit your tests. You have to use it in conjunction with Vim and the code.vim plugin to get this experience.

The way this works is by creating functions with the same names as the ones used by Mocha. The main difference is when you call the it() function, instead of just storing the closure to be run later, it just runs it right then. The main file, test-alive.js is passed to the REPL to allow these custom functions to be in scope when running in code.vim.

Inteded Use:

I don't indend this to replace Mocha or run inside it. This only emulates a small fraction of Mocha features. You should run your tests with Mocha to find out their true behavior and if
they really pass or fail. This just provides some useful live feedback before you run your tests in Mocha.
