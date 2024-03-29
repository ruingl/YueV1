const path = require('path');
const fs = require('fs-extra');
const { logger } = require('./System/logger');

async function loadCommands() {
  logger.info("Loading commands...");

  const commandPath = path.join(__dirname, "Yue", "commands");
  const commandFiles = await fs.readdir(commandPath);

  commandFiles.filter((file) => file.endsWith(".js")).forEach(async (file) => {
    try {
      const commandModule = require(path.join(commandPath, file));
      const commandName = path.basename(file, ".js");

      if (!commandModule.metadata) {
          throw new Error(`No metadata found on command: ${commandName}.js`);
      } else if (!commandModule.onRun) {
          throw new Error(`No onRun found on command: ${commandName}.js`);
      }

      const moduleName = commandModule.metadata.name;
      global.Yue.commands.set(moduleName, commandModule);
    } catch (error) {
      logger.error(`Error loading command ${file}: ${error.message}`);
    }
  });

  logger.success("Commands loaded successfully.");
}

function loadAppState() {
  try {
    const appStatePath = path.join(__dirname, "appstate.json");
    return JSON.parse(fs.readFileSync(appStatePath, "utf8"));
  } catch (error) {
    console.error("Error loading app state:", error);
    return null;
  }
}

module.exports = { loadCommands, loadAppState };