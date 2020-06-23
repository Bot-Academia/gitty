const fetch = require("node-fetch");
const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
  name: "repo-info",
  description: "Tells repo pull",
  async execute(message, args) {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;

    if (!args.length) {
      return message.channel.send("You need to supply a search term!");
    }

    var list = [];

    list = await fetch(
      `https://api.github.com/repos/${args}`,
      {
        headers: {
          authorization: "token " + process.env.GITHUB_TOKEN,
        },
      }
    ).then((response) => response.json());

    var things = [list.name, list.description, list.html_url, list.forks_count, list.language, list.stargazers_count];
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
    .setTitle("Repo Name "+ list.name)
    .addFields(
      { name: "description", value: list.description },
      { name: "Link",  value: `[${list.name}](${list.html_url})` },
      { name: "fork count", value: list.forks_count },
      { name: "language", value: list.language },
      { name: "star", value: list.stargazers_count }
    );
  message.channel.send(embed);
  },
};
