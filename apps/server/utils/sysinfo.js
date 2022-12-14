"use strict";

import logger from "../core/logger";

import os from "os";
import clui from "clui");
import pretty from "pretty-bytes";

module.exports = function () {
	let Gauge = clui.Gauge;
	let total = os.totalmem();
	let free = os.freemem();
	let used = total - free;
	let human = pretty(free);

	logger.info("CPU:\t\tArch: " + os.arch() + ", Cores: " + os.cpus().length);
	logger.info(
		"Memory:\t\t" + Gauge(used, total, 20, total * 0.8, human + " free")
	);
	logger.info("OS:\t\t" + os.platform() + " (" + os.type() + ")");
};
