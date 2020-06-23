const Discord = require("discord.js");

module.exports = {
  name: "help",     
  description: "shows command list",
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor("#EFFF00")
      .setTitle("Gitty command list")
      .setDescription('Gitty is a discord bot to help you with Open source')
      .addFields(
        {name:'server info',value: '`git serverinfo`',inline: true},
        {name:'member info',value: '`git memberinfo`',inline: true},
        {name:'Login your org', value: "`git addorg <github_orgname>`",inline:true},
        {name:'Login yourself',value: '`git adduser <github_username>`',inline:true},
        {name:'quote for life',value: '`git quote`',inline:true},
        {name:'To know more user commands 😎',value: '`git help-user`'},
        {name:'To know more orgs commands 👯',value: '`git help-org`'},
        {name:'To know more repo commands 📂',value: '`git help-repo`'},
      )
      .setFooter('Check [git about] to know about me 🤖');
    message.channel.send(embed);

  },
};
