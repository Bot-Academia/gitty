
const Discord = require("discord.js");

module.exports = {
  name: "help-hook",
  description: "shows command list",
  execute(message, args) {
   
    if(message.guild===null){
      return message.channel.send("I can't execute that command inside DMs!");
    }

    const embed = new Discord.MessageEmbed()
      .setColor("#EFFF00")
      .setTitle("Gitty Org Command list")
      .setDescription('Gitty is a discord bot to help you with Open source')
      .addFields(
        {name:"Add webhook",value: "`git addwebhook <reponame>`",inline: true},
        {name:"Before using above command give gitty manage webhooks permission.",value: "[Know more](https://bit.ly/31ijYxr)"},
        {name:"To know more about Gitty's webhook feature.",value: "[Know more](https://bit.ly/38aohvP)",},
      )
      .addFields(
        {name:"You need to register your org first to be able to use the above commands!", value:"Run this command to add org `git addorg <org_name>`"}
    )
      .setFooter('Check [git about] to know about me 🤖');
    message.channel.send(embed);

  },
};
