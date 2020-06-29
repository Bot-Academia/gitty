const Discord = require("discord.js");
const axios = require("axios");
const { execute } = require("./help-org");
const config = require("../config.json");
const info = require("../controllers/info");
require('dotenv').config();



module.exports = {
    name : "addwebhook",
    description : "adds a webhook to respective channel",
    async execute(message,args){
    
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;

    var orgname = null;
    var hook = null;
    var id = null;
    var token = null;

    if(message.guild===null){
      return message.channel.send("I can't execute that command inside DMs!");
    }

    if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_GUILD')) {

      orgname=await info.execute(message.guild.name);
      console.log(orgname);   

      if (!orgname)
      return message.channel.send("You need to  register your organization by using `git addorg <orgname>`.");

    if (!args.length) {
        return message.channel.send("Please provide a valid repo name under your organization");
    }
  
    args=String(args);
    var nethook;

  await message.channel.createWebhook(args, {
        avatar: message.client.user.displayAvatarURL(),
    }).then(res => { 
        nethook=res;
    }).catch(console.error);

    console.log(nethook);

    id=nethook.id;
    token=nethook.token;


  var payload= " https://discordapp.com/api/webhooks/"+id+"/"+token+"/github";

   await axios.post('https://api.github.com/repos/'+orgname+'/'+args+'/hooks',{
    "name": "web",
    "active": true,
    "events": [
      "push",
      "pull_request",
      "issues",
      "issue_comment"
 ],
    "config": {
      "url": payload,
      "content_type": "json",
      "insecure_ssl": "0"
    }
  },{
    headers: {
      authorization: "token " + process.env.GITHUB_TOKEN,
    },
  })
    .then(res=>{console.log(res.data)
    message.channel.send("Webhook added!");})
    .catch(error=>{console.log(error)
    message.channel.send("There some issue check documentation or use `git help-hook`")});
    }

    else{
      message.reply("You dont have permission to use this command only administrator can use this command.");
    }

}

}
