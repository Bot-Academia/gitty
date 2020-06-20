
const fetch = require('node-fetch');
const Discord = require('discord.js');
const config = require('../config.json');

module.exports = {
    name : 'pulls',
    description : 'Lists repo PRs',
  async execute(message,args){

        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        if (!args.length) {
            return message.channel.send('You need to supply a search term!');
          }


        if(!config.org){
            return message.channel.send('No organization added. Please add organization using git addorg <name>');
        }
          
      
         var list = [];


      list = await fetch(`https://api.github.com/repos/${config.org}/${args}/pulls`).then(response => response.json());
      
      
          const embed = new Discord.MessageEmbed()
              .setColor('#'+randomColor)
              .setTitle('Repo PRs')

          for(let i=0;i<list.length;i++){    
             embed.addFields(  
                 
                  { name: 'PR '+(i+1), value: trim(list[i].title, 1024) }
              );
         }  

       message.channel.send(embed)
      
    }
}