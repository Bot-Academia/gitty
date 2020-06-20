const Discord = require('discord.js');
const config = require('../config.json');

module.exports={
    name: "addorg",
    description: "sets the org name",
    execute(message,args){
        config.org=args;
        message.channel.send("Added "+ args + " as a organization");
    }
}
