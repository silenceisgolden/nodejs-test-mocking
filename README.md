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
```

In this project's `packages` folder, you will see examples of what works these days, and what does not work. Over time, I would like to run all of these examples on multiple node versions. I would also like to test with Node.js' native esm support.

## Results

### Node 18.x

| Configuaration                         | Result             |
| -------------------------------------- | ------------------ |
| JavaScript with CommonJS Module syntax | :white_check_mark: |
| TypeScript with `ts-node` compilation  | :white_check_mark: |
| Typescript with `esbuild` compilation  | :x:                |
