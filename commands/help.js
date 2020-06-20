const Discord = require('discord.js');

module.exports={
    name: 'help',
    description : 'shows command list',
    execute(message,args){
        const embed= new Discord.MessageEmbed()
        .setColor('#EFFF00')
        .setTitle('Gitty command list')
        .addFields(
            {name:'ping me',value: 'git ping'},
            {name:'server info',value: 'git serverinfo'},
            {name:'member info',value: 'git memberinfo'},
            {name:'square any num',value: 'git square'},
            {name:'github info',value: 'git user'},
            {name:'quote for life',value: 'git quote'},
            {name:'Get org info',value: 'git org'}
        );
message.channel.send(embed);
    }
}