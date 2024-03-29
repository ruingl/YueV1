module.exports = {
  metadata: {
    name: "adduser",
    description: "Adds a user to a thread by UID",
    usage: "adduser <uid>",
    author: "LiANE",
    role: "0",
  },
  onRun: ({ api, event, args, box }) => {
    const uid = args.join(" ");
    if (!uid) {
      box.reply(
        "Please provide a UID after the command. For example: `adduser <uid>`"
      );
      return;
    }

    try {
      api.addUserToGroup(uid, event.threadID);
      box.reply(`User with UID ${uid} added successfully.`);
    } catch (err) {
      box.reply(`An error occurred while adding the participant: ${err.message}`);
    }
  },
};