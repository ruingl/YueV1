const axios = require("axios");
const { botPrefix } = global.Yue;

module.exports = {
  metadata: {
    name: "teach",
    description: "Teach SimSimi a response.",
    usage: "teach [message] [answer]",
    author: "Rui",
    role: "0",
  },

  onRun: async ({ api, event, args, box }) => {
    const message = args[0];
    const answer = args.slice(1).join(" ");

    if (!message || !answer) {
      box.reply(`Invalid command usage. Correct format: \`${botPrefix}teach [message] [answer]\``);
      return;
    }

    try {
      const response = await axios.get(
        `https://simsimi.fun/api/v2/?mode=teach&lang=en&message=${encodeURIComponent(message)}&answer=${encodeURIComponent(answer)}`
      );
      const teachResponse = response.data.success
        ? "Teaching successful!"
        : "Failed to teach SimSimi.";
      box.reply(teachResponse);
    } catch (error) {
      console.error("Error:", error);
      box.reply("An error occurred while teaching SimSimi.");
    }
  },
};