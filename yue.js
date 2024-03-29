const login = require("fca-unofficial");
const figlet = require('figlet');
const config = require("./config.json");
const chalk = require("chalk");
const { logger } = require("./System/logger");

global.Yue = {
  config: config,
  botPrefix: config.botPrefix,
  botAdmins: config.botAdmins,
  commands: new Map(),
};

async function start() {
  try {
    figlet.text('Yue', function(err, data) {
      if (err) {
        logger.error("Error displaying 'Yue' with Figlet:", err);
      } else {
        console.log(chalk.cyan(data));
      }
    });

    const utils = require('./utils');
    const listen = require('./System/listen');
    await utils.loadCommands();

    const appState = utils.loadAppState();
    login({ appState }, async (err, api) => {
      if (err) {
        logger.error("Error during login:", err);
        return;
      }

      global.listenEmitter = api.listenMqtt(async (err, event) => {
        if (err) {
          logger.error("Error occurred while processing event:", err);
          return;
        }

        listen(api, event);
      });
    });
  } catch (error) {
    logger.error("Error during startup:", error);
  }
}

start();