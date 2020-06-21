const fetch = require("node-fetch");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "pulls",
  description: "Lists repo PRs",
  async execute(message, args) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;

    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }

    var orgname=null;


    for(var i=0;i<config.user.length;i++){
      if(config.user[i].guildname===message.guild.name)
         {
           orgname=config.user[i].org;
         }
 }

    if (!orgname) {
      return message.channel.send(
        "No organization added. Please add organization using git addorg <name>"
      );
    }

    var list = [];

    list = await fetch(
      `https://api.github.com/repos/${orgname}/${args}/pulls`,
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN,
        },
      }
    ).then((response) => response.json());

    const embed = new Discord.MessageEmbed()
      .setColor("#" + randomColor)
      .setTitle("Repo PRs");

      if(list.length){
        for (let i = 0; i < list.length; i++) {

          var link = trim(list[i].html_url, 1024)
          var issue = trim(list[i].title, 1024)
    
          embed.addFields({
            name: "PR #" + list[i].number,
            value: `[${issue}](${link})`,
          });
        }
      }else{
        embed.addFields({
          name: "error",
          value: "This repo has no PR",
        });
      }

    message.channel.send(embed);
  },
};
