const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let { body } = await superagent.get(`http://aws.random.cat/meow`);

  let catEmbed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Kedi")
    .setImage(body.file);

  message.channel.send(catEmbed);
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  category: "fun",
  permLevel: 0
};

module.exports.help = {
  name: "kedi",
  description: "Rastgele kedi görseli atar.",
  usage: "kedi"
};
