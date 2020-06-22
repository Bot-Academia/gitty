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
    message.channel.send("Added " + args + " as a organization");

    var orgname = args;
    var flag = 0;

    for (var i = 0; i < config.user.length; i++) {
      if (config.user[i].guildname === message.guild.name) {
        config.user[i].org = orgname;
        flag = 1;
      }
    }

    var servername = message.guild.name;
    if (flag === 0) {
      config.user.push({
        guildname: "" + servername,
        org: "" + args,
      });
    }

    for (var i = 0; i < config.user.length; i++) {
      if (config.user[i].guildname === message.guild.name) {
        console.log(config.user[i].org);
      }
    }
  },

};
