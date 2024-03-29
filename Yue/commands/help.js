const { botPrefix } = global.Yue;

module.exports = {
  metadata: {
    name: "help",
    description: "Shows a list of available commands.",
    usage: "help",
    author: "Rui and Lia", // + liaaa
    role: "0",
  },
  onRun: ({ api, event, box }) => {
    const { body } = event;
    const [cmd, cmdName] = body.split(" ");

    if (!cmdName) {
      let helpMessage = `📍 | 𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀:\n`;

      global.Yue.commands.forEach((command, name) => {
        const { metadata } = command;
        helpMessage += `➤ 【 ${metadata.name || " No Name"} 】- ${
          metadata.description || "No description"
        }\n`;
      });

      box.reply(helpMessage);
    } else {
      const reqCmd = global.Yue.commands.get(cmdName);
      if (!reqCmd) {
        box.reply("Command not found.");
        return;
      }
      const { metadata } = reqCmd;
      box.reply(
        `➤【 ${metadata.name || "Guide:"} 】
📝 Created by: ${metadata.author || "Anonymous"}
💡 Description:
${metadata.description || "Its a mystery"}
💡 Usage: 
${botPrefix}${metadata.usage || "Guess it"}
👑 Role: ${metadata.role || "0"}`,
      );
    }
  },
};