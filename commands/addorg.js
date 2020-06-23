require("dotenv").config();
const Discord = require("discord.js");
const config = require("../config.json");
const axios = require("axios");
const signup = require("../controllers/signup");
const fetch = require("node-fetch");

module.exports = {
  name: "addorg",
  description: "sets the org name",
  guildOnly: true,
 async execute(message, args) {


    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }
    

    var list = [];

    list = await fetch(`https://api.github.com/orgs/${args}`, {
      headers: {
        authorization: "token " + process.env.GITHUB_TOKEN,
      },
    }).then((response) => response.json());

    if(list.name){
      signup.execute(message.guild.name,args);
      message.channel.send("Added " + args + " as a organization");
    }
    else
      message.channel.send("No such organization exists on github.");
     

    
        

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
