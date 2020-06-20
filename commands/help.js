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
        {name:'server info',value: 'git serverinfo',inline: true},
        {name:'member info',value: 'git memberinfo',inline: true},
        { name:'Get org info', value: "git org",inline:true},
        {name:'github info',value: 'git user',inline:true},
        {name:'quote for life',value: 'git quote',inline:true},
        {name:'Issue list of a github repo',value: 'git issues',inline:true},
        {name:'PR list of a github repo',value: 'git pulls',inline:true},
        {name:'Add a default organization',value: 'git addorg',inline:true},
      )
      .setFooter('Check [git about] to know about me 🤖');
    message.author.send(embed);

  },
};
