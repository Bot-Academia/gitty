require("dotenv").config();
const Discord = require("discord.js");
const config = require("../config.json");
const axios = require("axios");
const signup = require("../controllers/user-signup");
const fetch = require("node-fetch");

module.exports = {
  name: "adduser",
  description: "sets the username",
 async execute(message, args) {


    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }
    

    var list = [];
    list = await fetch(`https://api.github.com/users/${args}`, {
      headers: {
        authorization: "token " + process.env.GITHUB_TOKEN,
      },
    }).then((response) => response.json());

    if(list.type==="User"){
      signup.execute(message.author.id,args);
      message.channel.send("Added " + args + " as a user");
    }
    else
      message.channel.send("No such user exists on github.");
     

    
        

    // for (var i = 0; i < config.user.length; i++) {
    //   if (config.user[i].guildname === message.guild.name) {
    //     config.user[i].org = orgname;
    //     flag = 1;
    //   }
    // }

    // var servername = message.guild.name;
    // if (flag === 0) {
    //   config.user.push({
    //     guildname: "" + servername,
    //     org: "" + args,
    //   });
    // }

    // for (var i = 0; i < config.user.length; i++) {
    //   if (config.user[i].guildname === message.guild.name) {
    //     console.log(config.user[i].org);
    //   }
    // }
  },

};
