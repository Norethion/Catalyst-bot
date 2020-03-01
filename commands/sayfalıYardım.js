const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const fs = require("fs");

exports.run = async (bot, message, args, params, perms) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: ayarlar.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  var sayfalar = [
    `**Prefix:**  **${prefix}**\n**Anlık Komut Sayımız:** *${bot.commands.size}* **Aktif Komut Sayısı:** *82*\nKomutlar hakkında yardım almak için **${prefix}y <komut ismi>**\n ` +
      "**Yetkili Komutlar**\n\n" +
      bot.commands
        .filter(
          cmd => cmd.conf.category === "admin" && cmd.conf.enabled === true
        )
        .map(
          cmd =>
            ` ${prefix}**` +
            cmd.help.name +
            ` ::** *` +
            cmd.help.description +
            `*`
        )
        .join("\n"),
    "**Kullanıcı Komutları**\n\n" +
      bot.commands
        .filter(
          cmd => cmd.conf.category === "kullanıcı" && cmd.conf.enabled === true
        )
        .map(
          cmd =>
            ` ${prefix}**` +
            cmd.help.name +
            ` ::** *` +
            cmd.help.description +
            `*`
        )
        .join("\n"),
    "**Resim Komutları**\n\n" +
      bot.commands
        .filter(
          cmd => cmd.conf.category === "photo" && cmd.conf.enabled === true
        )
        .map(
          cmd =>
            ` ${prefix}**` +
            cmd.help.name +
            ` ::** *` +
            cmd.help.description +
            `*`
        )
        .join("\n"),
    "**Eğlence Komutları**\n\n" +
      bot.commands
        .filter(cmd => cmd.conf.category === "fun" && cmd.conf.enabled === true)
        .map(
          cmd =>
            ` ${prefix}**` +
            cmd.help.name +
            ` ::** *` +
            cmd.help.description +
            `*`
        )
        .join("\n"),
    "**NSFW :x:**\n\n" +
      bot.commands
        .filter(
          cmd => cmd.conf.category === "nsfw" && cmd.conf.enabled === true
        )
        .map(
          cmd =>
            ` ${prefix}**` +
            cmd.help.name +
            ` ::** *` +
            cmd.help.description +
            `*`
        )
        .join("\n")
  ];
  let sayfa = 1;

  const embed = new Discord.RichEmbed()
    .setColor("#cf1968")
    .setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`)
    .setDescription(sayfalar[sayfa - 1]);

  message.channel.send(embed).then(msg => {
    msg.react("⏪").then(r => {
      msg.react("⏩");

      const backwardsFilter = (reaction, user) =>
        reaction.emoji.name === "⏪" && user.id === message.author.id;
      const forwardsFilter = (reaction, user) =>
        reaction.emoji.name === "⏩" && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, {
        time: 60000
      });
      const forwards = msg.createReactionCollector(forwardsFilter, {
        time: 60000
      });

      backwards.on("collect", r => {
        if (sayfa === 1) return;
        sayfa--;
        embed.setDescription(sayfalar[sayfa - 1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        msg.edit(embed);
      });

      forwards.on("collect", r => {
        if (sayfa === sayfalar.length) return;
        sayfa++;
        embed.setDescription(sayfalar[sayfa - 1]);
        embed.setFooter(`Sayfa ${sayfa} - ${sayfalar.length}`);
        msg.edit(embed);
      });
    });
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help", "yardımm", "yadrım", "yard"],
  category: "admin",
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Gelişmiş Sayfalı Yardım.",
  usage: "yardım"
};
