/*
    @author: Rui
    @message MADE BY RUI
    @version: 1.0.0
    @date: IDK
*/

const fs = require("fs");
const path = require("path");
const login = require("fca-unofficial");
const config = require("./config.json");
const express = require("express");
const chalk = require("chalk");

const app = express();
const commandPath = path.join(__dirname, "scripts", "commands");

global.Yue = {
  config: config,
  botPrefix: config.botPrefix,
  botAdmins: config.botAdmins,
  commands: {},
};

function loadCommands() {
  const commandPath = path.join(__dirname, "scripts", "commands");
  const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((file) => {
    const commandName = path.basename(file, ".js");
    global.Yue.commands[commandName] = require(path.join(commandPath, file));
  });
}

loadCommands();

login({ appState: loadAppState() }, (err, api) => {
  if (err) return console.error(err);

  api.listen((err, event) => {
    if (err) {
      console.error("Error occurred while processing event:", err);
      return;
    }
    // Liane : new func add
    const react = (emoji) => {
      api.setMessageReaction(emoji, event.messageID, () => {}, true);
    };

    const reply = (msg) => {
      api.sendMessage(msg, event.threadID, event.messageID);
    };

    const add = (uid) => {
      api.addUserToGroup(uid, event.threadID);
    };

    const kick = (uid) => {
      api.removeUserFromGroup(uid, event.threadID);
    };

    const send = (msg) => {
      api.sendMessage(msg, event.threadID);
    };

    const box = {
      react: react,
      reply: reply,
      add: add,
      kick: kick,
      send: send,
    };

    const { commands } = global.Yue;

    try {
      if (event.body && event.body.toLowerCase() === "prefix") {
        api.sendMessage(
          `My prefix is: \`${PREFIX}\``,
          event.threadID,
          event.messageID,
        );
      } else if (event.body && event.body.toLowerCase().startsWith(PREFIX)) {
        const [command, ...args] = event.body
          .slice(PREFIX.length)
          .trim()
          .split(" ");

        if (commands[command]) {
          commands[command].run({ api, event, args, box });
        } else {
          api.sendMessage("Invalid command.", event.threadID, event.messageID);
        }
      }
    } catch (error) {
      console.error("Error occurred while executing command:", error);
    }
  });
});

function loadAppState() {
  try {
    const appStatePath = path.join(__dirname, "appstate.json");
    return JSON.parse(fs.readFileSync(appStatePath, "utf8"));
  } catch (error) {
    console.error("Error loading app state:", error);
    return null;
  }
}

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/github", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "github.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.grey("yuev1 - (1.0.0)"));
  console.log(chalk.green("[fca]: Logging in"));
  console.log(chalk.green("[express]: Open on PORT 3000"));
  console.log("");
});