
const Discord = require("discord.js");

module.exports = {
  name: "help-repo",
  description: "shows command list",
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor("#EFFF00")
      .setTitle("Gitty Repo Command list")
      .setDescription('Gitty is a discord bot to help you with Open source')
      .addFields(
        {name:"Repo Details",value: "`git repo-info <owner/repo>`",inline: true},
        {name:"Repo Contributors",value: "`git repo-contri <owner/repo>`",inline: true},
        {name:"Repo issues",value: "`git repo-issue <owner/repo>`",inline: true},
        {name:"Repo pulls",value: "`git repo-pull <owner/repo>`",inline: true},
      )
      .setFooter('Check [git about] to know about me 🤖');
    message.channel.send(embed);

  },
};
