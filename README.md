# test-alive
Bring your JavaScript tests to life.

The way this runs tests makes it possible to have a live coding experience while you edit your tests. You have to use it in conjunction with Vim and the code.vim plugin to get this experience.

Ideas and notes to get this working:

I could try making this a Mocha wrapper that instantiates Mocha, initializes the bdd UI on the global context, then execute the run method of the Mocha instance.

This explains Mocha internals, so it might be helpful: https://plus.google.com/events/cgam5u6i70d8372sv8ng15akii4
Approximately 27 minutes into that video it talks about preparing and running tests, which is the behavior I will have to customize.

browser-entry.js:112 is what would put describe, it, etc., into the global context.

Mocha notes:

mocha.opts is a file you can place in your test directory and place default terminal options in the file.
