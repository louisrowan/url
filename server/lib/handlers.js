'use strict';

const config = require('../config');
const util = require('./util');


exports.createUrl = async (req, res) => {

	if (!req.body.url) {
		res.status(400);
		res.send({ error: 'URL is required'});
	}

	if (req.body.url.substring(0,7) !== 'http://') { // default everything to http for now
		req.body.url = 'http://' + req.body.url;
	}

	const db = req.app.db;
	const Url = db.instance.models.Url;

	let attempts = 0;
	let shortenedPath;

	while (attempts < config.MAX_ATTEMPTS) {
		shortenedPath = util.createPath();

		const matches = await Url.findAll({
			where: {
				shortenedPath
			}
		});

		if (!matches.length) {
			break;
		}

		++attempts;
	}

	if (!shortenedPath) {
		// reached max attempts

		res.status(500);
		return res.send({ error: 'Internal Server Error' });
	}

	const instance = Url.build({
		fullPath: req.body.url,
		shortenedPath
	});

	try {
		const savedUrl = await instance.save();

		console.log(JSON.stringify({
			event: 'saveUrl',
			savedUrl
		}, null, 2 ));

		return res.send(savedUrl.dataValues);
	}
	catch (err) {
		res.status(500);

		return res.send({ error: 'Internal Server Error' });
	}
};


exports.getUrl = async (req, res) => {

	const db = req.app.db;
	const Url = db.instance.models.Url;

	const results = await Url.findAll({
		where: {
			shortenedPath: req.params.url
		}
	})

	if (!results.length) {
		res.status(404);

		return res.send({ error: 'URL not found' });
	}
	else if (results.length > 1) {
		// this means we have a data integrity issue, multiple entries with the same shortened path

		res.status(500);

		return res.send({ error: 'Internal Server Error' });
	}

	console.log(JSON.stringify(
		{ event: 'getUrl', url: req.params.url },
	null, 2));

	return res.send(results[0].dataValues);
}

