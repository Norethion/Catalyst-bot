const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("Bu komutu kullanamazsın!");
  if (args[0] == "yardım") {
    message.reply("Kullanım: söyle <mesaj>");
    return;
  }
  let botMessage = args.join(" ");
  message.delete().catch();
  message.channel.send(botMessage);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say", "soyle"],
  category: "fun",
  permLevel: 2
};

exports.help = {
  name: "söyle",
  description: "Bota istediğinizi söyletir.",
  usage: "söyle <metin>"
};
