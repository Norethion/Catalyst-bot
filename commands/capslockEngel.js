const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");

exports.run = async (client, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(`:fire: Yeterli yetki, bulunmamakta!`);

  let capslock = await db.fetch(`capslock_${message.guild.id}`);
  if (capslock) {
    db.delete(`capslock_${message.guild.id}`);
    message.channel.send(`:fire: Capslock engelleme sistemi, **kapatıldı!**`);
  }

  if (!capslock) {
    db.set(`capslock_${message.guild.id}`, "acik");
    message.channel.send(`:fire: Capslock engelleme sistemi, **aktif!**`);
  }
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["capslock-engel"],
  permLevel: 3
};
exports.help = {
  name: "cl-engel",
  description: "Capslock kullanımını engeller.",
  usage: "cl-engel"
};
