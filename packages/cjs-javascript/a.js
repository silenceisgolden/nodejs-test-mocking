'use strict';

/**
 * // TODO: complete the list
 *
 * 1. Mock built-in
 * 2. Mock library
 * 3. Mock fetch
 * 4. Mock crypto
 * 5. Mock complex vendor module
 */

const { writeFile, mkdir } = require('fs/promises');

const DEFAULT_CONTENTS = JSON.stringify({
	require: 'js',
});

const writeContents = async (contents = DEFAULT_CONTENTS) => {
	await mkdir('./dist', { recursive: true });
	await writeFile('./dist/a-written.js', contents, { encoding: 'utf-8' });
}

exports.writeContents = writeContents;
