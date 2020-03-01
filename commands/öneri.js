const Discord = require("discord.js");
const fs = require("fs");

exports.run = function(client, message, args) {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  var öneri = args.slice(0).join(" ");
  var guildID = "341967328595935253";
  var channelID = "644596253497360394";

  if (!öneri) {
    return message.reply(
      `Bir mesaj belirtin! **Doğru Kullanım:** ${prefix}öneri <mesaj>`
    );
  } else {
    var embed = new Discord.RichEmbed()
      .setTimestamp()
      .addField("Eylem:", "Öneri")
      .addField("Kullanıcı:", message.author.tag)
      .addField("ID", message.author.id)
      .addField("Öneri", öneri);

    client.guilds
      .get(guildID)
      .channels.get(channelID)
      .send(embed);
    message.channel.send("Öneriniz alınmıştır! Teşekkür ederiz.");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["öner"],
  category: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: "öneri",
  description: "Bot hakkındaki önerilerinizi bot sahiplerine ulaştırır.",
  usage: "öneri <mesaj>"
};
