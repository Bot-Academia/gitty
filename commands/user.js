const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
  name: "user",
  description: "Tells github info",
  async execute(message, args) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // const trim = (str, max) =>
    //   str.length > max ? `${str.slice(0, max - 3)}...` : str;

    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }

    var list = [];
    list = await fetch(`https://api.github.com/users/${args}`, {
      headers: {
        authorization: "token " + process.env.GITHUB_TOKEN,
      },
    }).then((response) => response.json());

    const embed = new Discord.MessageEmbed()
      .setColor("#" + randomColor)
      .setTitle("Github User")
      .addFields(
        { name: "Name", value: list.name },
        { name: "Location", value: list.location },
        { name: "Bio", value: list.bio },
        { name: "Public Repos", value: list.public_repos },
        { name: "URL", value: list.html_url }
      );
    message.channel.send(embed);
  },
};
