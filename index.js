
require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const fetch = require('node-fetch');
const querystring = require('querystring');
const config = require('./config.json');
const axios = require('axios');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var servername = null;
var guildcollection=null;

bot.once('ready', () => {
	console.log('Ready!');
	guildcollection=bot.guilds.cache;
	bot.user.setActivity(' git help ');
});



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}



bot.on('message', async message => {

	
	 

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

const args = message.content.slice(config.prefix.length).split(/ +/);
const command = args.shift().toLowerCase();


console.log(command.guildOnly);

if (command==='addorg' && message.channel.type !== 'text') {
	return message.reply("I can't execute that command inside DMs!");
}

if(message.channel.type==='text')
{servername=message.guild.name;}



if(command==='botstats'){
	message.channel.send(guildcollection.size);
return guildcollection.map(guild => message.channel.send(guild.name));
}


	console.log(message.content);

    if (!bot.commands.has(command)) { return message.reply(
		'Invalid command. Try `git help` to learn more about available commands'
	);}

	try {
		bot.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}



});






bot.login(process.env.BOT_TOKEN);




