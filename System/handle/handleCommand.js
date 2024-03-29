const fonts = require('./createFonts');
const { botPrefix, botAdmins, commands } = global.Yue;
const { logger } = require('../logger');

module.exports = async function(api, event, box) {
  try {
    if (event.body.toLowerCase() === "prefix") {
      box.reply(`${fonts.sans("My prefix is:")} [ ${botPrefix} ]`);
      return;
    }

    if (event.body && event.body.toLowerCase().startsWith(botPrefix)) {
      const [command, ...args] = event.body
        .slice(botPrefix.length)
        .trim()
        .split(" ");

      const selectedCommand = commands.get(command);
      if (!selectedCommand) {
        box.reply(`❌ | ${fonts.sans(`Command ${command} not found. Use ${botPrefix}help to see available commands.`)}`);
        return;
      }

      const { metadata, onRun } = selectedCommand;
      if (metadata.role === "1" && !botAdmins.includes(event.senderID)) {
        box.reply(`❌ | ${fonts.sans(`You don't have permission to use this command.`)}`);
        return;
      }

      try {
        await onRun({ api, event, args, box, fonts });
      } catch (error) {
        logger.error(`Error occurred while executing command "${command}":`, error);
        box.reply(`❌ | ${fonts.sans(`An error occurred while executing the command: ${error.message}`)}`);
      }
    }
  } catch (error) {
    logger.error("Error occurred while processing command:", error);
  }
};