const fetch = require("node-fetch");
const Discord = require("discord.js");
const config = require('../config.json');

module.exports = {
  name: "org",
  description: "Tells org info",
  async execute(message, args) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;


    if (!args.length) {
      if(!config.org.length)
      return message.channel.send("You need to supply a search term!");
      else
      args=config.org;
    }

    var list = [];
    list = await fetch(`https://api.github.com/orgs/${args}`,{
      headers: {
        authorization: "token "+process.env.GITHUB_TOKEN
      }}).then((response) =>
      response.json()
    );

    var things = [list.description, list.public_repos, list.email, list.blog];
    var display = [];
    for (let i = 0; i < things.length; i += 1) {
      if (things[i]) {
        display.push(things[i]);
      } else {
        display.push("No info given");
      }
    }

    const embed = new Discord.MessageEmbed()
      .setColor("#" + randomColor)
      .setTitle("Github User")
      .addFields(
        { name: "Description", value: trim(display[0], 1024) },
        { name: "Public Repos of this org", value: trim(display[1], 1024) },
        { name: "Email", value: trim(display[2], 1024) },
        { name: "Website", value: trim(display[3], 1024) }
      );

    message.channel.send(embed);
  },
};
