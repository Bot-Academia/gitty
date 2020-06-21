
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


bot.once('ready', () => {
	console.log('Ready!');
});



for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}



bot.on('message', async message => {

	
	 servername=message.guild.name;

    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

const args = message.content.slice(config.prefix.length).split(/ +/);
const command = args.shift().toLowerCase();


	console.log(message.content);

    if (!bot.commands.has(command)) return;

	try {
		bot.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}



});


axios.get(process.env.FIREBASE+servername+'.json')
      .then(res=>{ const data = res.data;
        for(let key in data)
          config.org=data[key].org;
      });





bot.login(process.env.BOT_TOKEN);




