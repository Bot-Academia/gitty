
const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
    name : 'user',
    description : 'Tells github info',
  async execute(message,args){

        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

        if (!args.length) {
            return message.channel.send('You need to supply a search term!');
          }
      
          
      
         var list = [];
      list = await fetch(`https://api.github.com/users/${args}`,{
        headers: {
          authorization: "token "+process.env.GITHUB_TOKEN
        }}).then(response => response.json());
      
      
      
      
      
      
          const embed = new Discord.MessageEmbed()
              .setColor('#'+randomColor)
              .setTitle('Github User')
              .addFields(
                  { name: 'Name', value: trim(list.name, 1024) },
                  { name: 'Location', value: trim(list.location, 1024) },
                  { name: 'Bio', value: trim(list.bio, 1024) },
                  { name: 'Public Repos', value: trim(list.public_repos, 1024) },
                  { name: 'URL', value: trim(list.html_url, 1024) },
              );
          message.channel.send(embed)
      
    }
}