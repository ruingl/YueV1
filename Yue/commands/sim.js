const axios = require("axios");
const { botPrefix } = global.Yue;

module.exports = {
  metadata: {
    name: "sim",
    description: "Talk to SimSimi.",
    usage: "sim [message]",
    author: "Rui",
    role: "0",
  },

  onRun: async ({ api, event, args, box }) => {
    const message = args.join(" ");

    if (!message) {
      box.reply(`Invalid command usage. Correct format: \`${botPrefix}sim [message]\``);
      return;
    }

    try {
      const response = await axios.get(
        `https://simsimi.fun/api/v2/?mode=talk&lang=en&message=${encodeURIComponent(message)}&filter=true`
      );
      const simResponse = response.data.success
        ? response.data.success
        : "Sorry, I couldn't understand that.";
      box.reply(simResponse);
    } catch (error) {
      console.error("Error:", error);
      box.reply("An error occurred while talking to SimSimi.");
    }
  },
};