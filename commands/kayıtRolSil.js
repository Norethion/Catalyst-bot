const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const db = require("quick.db");

  let role1 =
    message.mentions.roles.first() ||
    message.guild.roles.find(r => r.name === args.slice(0).join(" "));

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  if (args[0] === "kapat") {
    if (db.has(`kayıtR_${message.guild.id}`) === true) {
      message.channel.send(`Kayıt rolü başarıyla kaldırıldı`);
      db.delete(`kayıtR_${message.guild.id}`);
      return;
    }
    message.channel.send(`silme rolü ayarlanmamış.`);
    return;
  }

  if (!role1) {
    return message.reply(
      `Lütfen bir rol etiketleyin veya rol adını yazın örnek: **${prefix}kayıtsilrol @rol** veya **${prefix}kayıtsilrol rol-adı** `
    );
  }

  db.set(`kayıtsilR_${message.guild.id}`, role1.id);

  const embed = new Discord.RichEmbed()
    .setDescription(
      ` Silme rolü başarıyla ayarlandı: **${role1.name}**\nSilme rolünü kapatmak isterseniz **${prefix}kayıtsilrol kapat** yazmanız yeterlidir.`
    )
    .setColor("RANDOM");
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil-rol"],
  category: "admin",
  permLevel: 4
};

exports.help = {
  name: "kayıtsilrol",
  description: "Kayıt olunca silinecek rolü ayarlar.",
  usage: "kayıtsilrol <@rol> rol-adı"
};
