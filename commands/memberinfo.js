const userinfo = require("../controllers/user-info");

module.exports = {
  name: "memberinfo",
  description: "Tells user info",
  async execute(message, args) {
    message.channel.send(
      `Your username: ${message.author.username}\nYour ID: ${message.author.id}`
    );
    var username = null;
    username = await userinfo.execute(message.author.id);
    if (username) {
      message.channel.send(`Your Github username is ${username}`);
    } else {
      message.channel.send(
        "You are not registered.Use `git adduser <github_username>`or `git help-user`"
      );
    }
  },
};
