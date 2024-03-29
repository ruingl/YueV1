const axios = require("axios");
const { botPrefix } = global.Yue;

module.exports = {
  metadata: {
    name: "ai",
    description: "Interact with an AI to get responses to your questions.",
    usage: "ai <question>",
    author: "Rui",
    role: "0",
  },

  onRun: async ({ api, event, args, box }) => {
    const arg = args.join(" ");

    if (args) {
      try {
        const response = await axios.get(
          `https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(
            arg,
          )}`,
        );
        const aiResponse = response.data.reply;
        box.reply(aiResponse);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        box.reply("Failed to get AI response. Please try again later.");
      }
    } else {
      box.reply(
        `Please provide a question after the command. For example: \`${botPrefix}ai Hello\``
      );
    }
  },
};