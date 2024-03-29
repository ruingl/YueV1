module.exports = {
  metadata: {
    name: "hello",
    description: "Greet the user with 'Hello, World!'",
    author: "Rui",
    usage: "hello",
    role: "0",
  },

  onRun: ({ api, event, box }) => {
    box.reply("Hello, World!");
  },
};