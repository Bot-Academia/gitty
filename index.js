const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
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
        message.channel.send('All commands : git ping\ngit pong\n\git server\ngit user-info\ngit square\ngit help');
    }


});

client.login(config.token);




