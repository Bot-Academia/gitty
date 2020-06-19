module.exports = {
    name: 'serverinfo',
    description : 'Tells about server',
    execute(message,args){
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal nerds: ${message.guild.memberCount}`);
    }
}