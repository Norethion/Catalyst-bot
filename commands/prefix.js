const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, prefix) => {
  if (!message.member.hasPermission("MANAGE_SERVER"))
    return message.reply("Hayır hayırr!");
  if (!args[0] || args[0 == "help"])
    return message.reply(`Kullanım: {prefix} <istenilen prefix>`);

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), err => {
    if (err) console.log(err);
  });

  let sEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle("Prefix Ayarla")
    .setDescription(`Prefix Şuna Ayarlandı --> ${args[0]}`);

  message.channel.send(sEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "admin",
  permLevel: 4
};

exports.help = {
  name: "prefix",
  description: "Prefixinizi değiştirir.",
  usage: "prefix <istenilen prefix>"
};
