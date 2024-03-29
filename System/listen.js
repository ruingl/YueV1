module.exports = async function(api, event) {
  const handleCommand = require('./handle/handleCommand');
  
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
  
  switch (event.type) {
    case "message":
      handleCommand(api, event, box);
      break;
  };
};