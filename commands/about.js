const Discord = require("discord.js");
module.exports = {
  name: "about",
  description: "About me",

  execute: (message, args) => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;

    let botInfoEmbed = new Discord.MessageEmbed()
      .setTitle(`Gitty's Info`)
      .setColor("#" + randomColor)
      .setThumbnail(message.client.user.displayAvatarURL())
      .addField("Bot Name", `Gitty`, true)
      .addField(
        "Come visit me",
        "[My Home](https://gittybot.netlify.app/)"
      )
      .addField(
        "I was born at Bot-Academia",
        "[Github](https://github.com/Bot-Academia)",
        true
      );

    message.channel.send(botInfoEmbed);
  },
};
