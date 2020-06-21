require("dotenv").config();
const Discord = require("discord.js");
const config = require("../config.json");
const axios = require("axios");

module.exports = {
  name: "addorg",
  description: "sets the org name",
  guildOnly: true,
  execute(message, args) {
    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }
    config.org = args;
    message.channel.send("Added " + args + " as a organization");
    var servername = message.guild.name;
    axios
      .put(process.env.FIREBASE + servername + ".json", { org: config.org })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  },
};
