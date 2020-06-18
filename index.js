const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const config = require('./config.json');
const client = new Discord.Client();

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);


client.once('ready', () => {
	console.log('Ready!');
});

var randomColor = Math.floor(Math.random()*16777215).toString(16);

client.on('message', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

const args = message.content.slice(config.prefix.length).split(/ +/);
const command = args.shift().toLowerCase();

if(command==='square'){
    if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }
    else{
        var val=parseInt(args[0]);
        val=val*val;
        message.channel.send(val);
    }
}

    console.log(message.content);


    if (command === 'quote') {

        
       

        const query = querystring.stringify({ term: args.join(' ') });
       var list = [];
    list = await fetch(`https://type.fit/api/quotes`).then(response => response.json())

var num = Math.floor(Math.random()*100);




		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle('Quote')
			.addFields(
				{ name: 'Quote', value: trim(list[num].text, 1024) },
				{ name: 'author', value: trim(list[num].author, 1024) },
			);
		message.channel.send(embed)


}

if (command === 'user') {

        
    if (!args.length) {
      return message.channel.send('You need to supply a search term!');
    }

    

   var list = [];
list = await fetch(`https://api.github.com/users/${args}`).then(response => response.json());






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


    if (message.content === config.prefix +'ping') {

        message.channel.send('Pong.');
    }
    else if(message.content=== config.prefix +'pong'){
        message.channel.send('Ping.');
    }

    else if (message.content === config.prefix + `server`) {
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal nerds: ${message.guild.memberCount}`);
    }

    else if (message.content === config.prefix+'user-info') {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }

    else if (message.content === config.prefix + 'help'){
        const embed= new Discord.MessageEmbed()
                .setColor('#EFFF00')
                .setTitle('Help')
                .addFields(
                    {value: 'git pong'},
                    {value: 'git ping'},
                    {value: 'git server'},
                    {value: 'git user-info'},
                    {value: 'git square'},
                    {value: 'git user'},
                    {value: 'git quote'}
                );
        message.channel.send(embed);
    }


});

client.login(config.token);




