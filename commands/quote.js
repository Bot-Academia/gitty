const fetch = require('node-fetch');
const Discord = require('discord.js');
module.exports = {
    name : 'quote',
    description : 'shows random quotes',
   async execute(message,args){
        
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        var list = [];
     list = await fetch(`https://type.fit/api/quotes`).then(response => response.json())
 
 var num = Math.floor(Math.random()*100);
 
 
 
 
         const embed = new Discord.MessageEmbed()
             .setColor('#'+randomColor)
             .setTitle('Quote')
             .addFields(
                 { name: 'Quote', value: trim(list[num].text, 1024) },
                 { name: 'Author', value: trim(list[num].author, 1024) },
             );
         message.channel.send(embed)
 
 
    }
}