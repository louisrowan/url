'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const config = require('./config');
const DB = require('./lib/db');
const handlers = require('./lib/handlers');


const startServer = async (options) => {

	try {
		const app = express();

		app.use(bodyParser.json());

		const routes = [
			{ path: '/', 			method: 'get', 		handler: (req, res) => res.send('OK') },
			{ path: '/urls', 		method: 'post', 	handler: handlers.createUrl },
			{ path: '/urls/:url',	method: 'get',		handler: handlers.getUrl }
		];

		routes.forEach((route) => {
			app[route.method](route.path, route.handler);
		});

		const db = new DB();

		await db.connect();

		app.db = db;

		app.listen(options.port, () => {
			console.log(`server started on port ${ options.port }`);
		});
	}
	catch (err) {
		console.log('error starting server:', err);
	}
}


if (require.main === module) {
	startServer({ port: config.SERVER_PORT });
}
