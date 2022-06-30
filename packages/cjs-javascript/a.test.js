'use strict';

const { expect } = require('chai');
const fs = require('fs/promises');
const { stub, restore } = require('sinon');

describe('a.js', () => {
	let writeFileStub;
	let mkdirStub;
	let subject;

	beforeEach(() => {
		writeFileStub = stub(fs, 'writeFile').resolves(undefined);
		mkdirStub = stub(fs, 'mkdir').resolves(undefined);

		/**
		 * In testing, at least with Node 18, you must stub before
		 * require-ing the subject module under test.
		 */
		subject = require('./a');
	});

	afterEach(() => {
		restore();
	});

	it('should call writeFile', async () => {
		const { writeContents } = subject;

		await writeContents();

		expect(writeFileStub.getCalls()).to.have.length(1);
		expect(mkdirStub.getCalls()).to.have.length(1);
	});
});
