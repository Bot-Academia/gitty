const fetch = require("node-fetch");
const Discord = require("discord.js");
const userinfo = require("../controllers/user-info");
require('dotenv').config();

module.exports = {
  name: "user-follower",
  description: "Tells github info",
  async execute(message, args) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // const trim = (str, max) =>
    //   str.length > max ? `${str.slice(0, max - 3)}...` : str;

    

    var username = null;

    username=await userinfo.execute(message.author.id);
    console.log(username);   

    if (!args.length) {
      if (!username)
      return message.channel.send(" You need to register yourself by using `git adduser <username>`.");
      else
      args=username;
  } 



    var list = [];
    list = await fetch(`https://api.github.com/users/${args}/followers`, {
      headers: {
        authorization: "token " + process.env.GITHUB_TOKEN,
      },
    }).then((response) => response.json());

    const embed = new Discord.MessageEmbed()
    .setColor("#" + randomColor)
    .setTitle("Follower Count: "+ list.length);

  if (list.length) {
    for (let i = 0; i < list.length && i<24; i++) {
      var link = list[i].html_url;
      var follower = list[i].login;
        var count = i + 1;
      embed.addFields({
        name: "Follower #" + count,
        value: `[${follower}](${link})`,
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
      value: "This User has no followers",
    });
  }

  message.channel.send(embed);
  },
};