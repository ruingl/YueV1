 const chalk = require("chalk");

const logger = {
  error: (text) => {
    let prefix = " ERROR ";
    console.log(`${chalk.bgRed(prefix)}: ${text}`);
  },

  success: (text) => {
    let prefix = " SUCCESS ";
    console.log(`${chalk.bgGreen(prefix)}: ${text}`);
  },

  warn: (text) => {
    let prefix = " WARN ";
    console.log(`${chalk.bgYellow(prefix)}: ${text}`);
  },

  info: (text) => {
    let prefix = " INFO ";
    console.log(`${chalk.bgWhite(prefix)}: ${text}`);
  },
};

module.exports = { logger };
