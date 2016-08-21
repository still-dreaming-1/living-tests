# living-tests [![Join the chat at https://gitter.im/still-dreaming-1/living-tests](https://badges.gitter.im/still-dreaming-1/living-tests.svg)](https://gitter.im/still-dreaming-1/living-tests?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
Bring your Node.js tests alive with living-tests.

Warning! This tool is so awesomely powerful that it is dangerous! It's like a machine gun with the trigger stuck so it repeatedly fires everywhere you point it! Writing your tests and running your tests becomes the same thing, before you even save, with every keystroke. If you are testing working with file systems, sending email, or anything that can change the world, just writing the tests can do great damage, so use with caution. You might even kick off multiple services or other long running processes before the first one finishes. It might be possible to create memory leaks or race conditions from not closing resources properly.

Only the proof of concept is working so far. It is not a framework or CLI tool yet. But it will give you live feedback for the test you are writing.

The way you write and run your tests with living-tests makes it possible to have a live coding experience while you edit your tests. You will see very short error messages appear just to right of failing assertions. You have to use Vim as your editor with the code.vim plugin to get this experience.

The way you write your test code will be a little different than other testing frameworks. You won't create functions or methods or clojures with your assertions inside them. All your test code and assertions are written outside of any functions. This is necessary in order to get the live experience.
