'use strict';

const { Sequelize, DataTypes } = require('sequelize');


const tables = [
	{
		name: 'Url',
		schema: {
			fullPath: {
				type: DataTypes.STRING,
				allowNull: false
			},
			shortenedPath: {
				type: DataTypes.STRING,
				allowNull: false
			}
		}
	}
];


module.exports = class DB {

	constructor() {
		this.instance = new Sequelize('sqlite:memory', { logging: false });
	}

	async connect() {

		try {
			await this.instance.authenticate();

			for (let i = 0; i < tables.length; ++i) {

				const { name, schema } = tables[i];
				const table = this.instance.define(name, schema);

				await table.sync();
			}
		}
		catch (err) {
			console.error('db connection err', err);

			throw err;
		}
	}
};
