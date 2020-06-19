module.exports={
    name : 'memberinfo',
    description : 'Tells user info',
    execute(message,args){
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
}