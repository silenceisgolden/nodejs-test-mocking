# nodejs-test-mocking

Current state of affairs for mocking in Node.js tests.

I got very frustrated that the ecosystem of modules, especially mocking modules in unit tests, seems to be changing without any published or recommended solutions. All of the blog posts I could find were outdated. When I would read a blog post, you would see an example like this:

```javascript
// a.test.js

const sinon = require('sinon');
const module = require('./module-to-mock');

const { fn } = require('./module-to-test');

describe('test', () => {
	let mock;

	beforeEach(() => {
		mock = sinon.stub(module, 'method').returns(42);
	});

	afterEach(() => {
		sinon.restore();
	});

	it('should work', () => {
		// fn calls module-to-mock.method internally
		fn();

		expect(mock.getCalls()).to.have.length(1);
	});
});

/**
 * Guess what, this example does not work in Node 18 with a built in module like "fs/promises"!
 * /
```

In this project's `packages` folder, you will see examples of what works these days, and what does not work. Over time, I would like to run all of these examples on multiple node versions. I would also like to test with Node.js' native esm support.

## Results

1. With some minimal testing so far, it seems like the module under test must be imported after stubs are set up.
2. `esbuild` compiles modules to a strict esm format that sets exports as read only. Libraries that help with mocking seem to now respect this and do not try to monkey patch or overwrite in any way a read-only export.

### Node 18.x

| Configuaration                         | Result             |
| -------------------------------------- | ------------------ |
| JavaScript with CommonJS Module syntax | :white_check_mark: |
| TypeScript with `ts-node` compilation  | :white_check_mark: |
| Typescript with `esbuild` compilation  | :x:                |

## Discussion points

### Should you have to mock any modules in a unit test?

Maybe you should not have to! However, the Node.js ecosystem has years of prior art that talks about mocking and provides examples of how to accomplish it, so it seems like something that needs to be preserved or at least explained to engineers that are trying to learn or running into unexpected issues.

Whether you actually need to mock anything in your unit tests will depend on what libraries and frameworks you are using and how they pass (or do not pass) dependencies to functions. I have started with a set of experiments that try to mock the internal `fs/promises` module because I have found that no matter how I organize functions and their dependencies in a project, I still would like to write a very basic unit test that makes sure I am calling the built in module's method without actually writing a file to the file system.
