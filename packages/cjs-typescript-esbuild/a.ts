import { writeFile, mkdir } from 'fs/promises';

const DEFAULT_CONTENTS = JSON.stringify({
	require: 'js',
});

export const writeContents = async (contents = DEFAULT_CONTENTS) => {
	await mkdir('./dist', { recursive: true });
	await writeFile('./dist/a-written.js', contents, { encoding: 'utf-8' });
};
