const fetch = require("node-fetch");
const Discord = require("discord.js");
const config = require("../config.json");
const info = require("../controllers/info");
require('dotenv').config();

module.exports = {
  name: "org-member",
  description: "Tells org info",
  async execute(message, args) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;

      if(message.guild===null){
        return message.channel.send("I can't execute that command inside DMs!");
      }

    var orgname = null;

      orgname=await info.execute(message.guild.name);
      console.log(orgname);   

    if (!args.length) {
      if (!orgname)
        return message.channel.send("You need to supply a search term!.\n You can also register your organization by using `git addorg <orgname>`.");
      else args = orgname;
    }

    var list = [];
    list = await fetch(`https://api.github.com/orgs/${args}/members`, {
      headers: {
        authorization: "token " + process.env.GITHUB_TOKEN,
      },
    }).then((response) => response.json());

    const embed = new Discord.MessageEmbed()
    .setColor("#" + randomColor)
    .setTitle("Public Member Count: "+ list.length);

  if (list.length) {
    for (let i = 0; i < list.length && i<24; i++) {
      var link = list[i].html_url;
      var member = list[i].login;
        var count = i + 1;
      embed.addFields({
        name: "Member #" + count,
        value: `[${member}](${link})`,
        inline: true,
      });
    }
    if(list.length>25){
        embed.addFields({
            name: "Limit Reached",
            value: "25 is the max limit",
          });
    }
  } else {
    embed.addFields({
      name: "Error",
      value: "This org has no Members",
    });
  }

  message.channel.send(embed);
  },
};
