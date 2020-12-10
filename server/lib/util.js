'use strict';

const start = "a".charCodeAt(0);
const end = "z".charCodeAt(0);
const charactersRange = end - start + 1; // if start was 5 and end was 10, range is 6: [5,6,7,8,9,10]

const charCount = 6;


exports.createPath = () => {

	let shortenedPath = '';

	for (let i = 0; i < charCount; ++i) {
		const charCode = Math.floor(Math.random() * charactersRange) + start;

		shortenedPath += String.fromCharCode(charCode);
	}

	return shortenedPath
}
