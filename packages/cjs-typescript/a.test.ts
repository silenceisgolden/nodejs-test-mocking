import { expect } from 'chai';
import * as fs from 'fs/promises';
import { stub, restore, SinonStub } from 'sinon';

import type * as m from './a';

describe('a.js', () => {
	let writeFileStub: SinonStub;
	let mkdirStub: SinonStub;
	let subject: typeof m;

	beforeEach(async () => {
		writeFileStub = stub(fs, 'writeFile').resolves(undefined);
		mkdirStub = stub(fs, 'mkdir').resolves(undefined);

		/**
		 * In testing, at least with Node 18, you must stub before
		 * require-ing the subject module under test.
		 */
		subject = await import('./a');
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
