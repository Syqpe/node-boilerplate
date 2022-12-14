"use strict";

import pkg from "../../../package.json";

module.exports = {
	app: {},

	db: {
		uri:
			process.env.MONGO_URI || "mongodb://localhost/" + pkg.config.dbName,
		options: {
			user: process.env.MONGO_USERNAME || "",
			pass: process.env.MONGO_PASSWORD || "",
		},
	},
};
