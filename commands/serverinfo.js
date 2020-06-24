const info = require("../controllers/info");
const fetch = require("node-fetch");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: 'serverinfo',
    description : 'Tells about server',
   async execute(message,args){
        if(message.guild===null){
            return message.channel.send("I can't execute that command inside DMs!");
          }
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal nerds: ${message.guild.memberCount}`);
        message.guild.members.fetch().then(fetchedMembers => {
            const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
            // We now have a collection with all online member objects in the totalOnline variable
            message.channel.send(`There are currently ${totalOnline.size} members online in ${message.guild.name}`);
        });

        var orgname = null;
        orgname=await info.execute(message.guild.name);
        if(orgname){
            message.channel.send(`Organization registered on this server is ${orgname}`);
        }
        else{
            message.channel.send("No organization registered.Use `git addorg <github_orgname>`or `git help-org`");
        }
    }
}