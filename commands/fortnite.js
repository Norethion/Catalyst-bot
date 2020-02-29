const Discord = require("discord.js");
const fortnite = require("fortnitetracker-7days-stats");
const fs = require("fs");

exports.run = (client, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  if (args.length < 2) {
    message.channel.send(
      `**Kullanım:** ${prefix}fortnite <platform> <kullanıcı adı>`
    );
    return;
  }

  var name = "";
  for (var i = 1; i < args.length; i++) {
    name += args[i] + " ";
  }
  name = name.trim();
  var url =
    "https://fortnitetracker.com/profile/pc/" + encodeURIComponent(name);
  message.channel.startTyping();

  fortnite.getStats(name, "pc", (err, result) => {
    if (err) {
      message.channel.send("Kullanıcı Adı Hatalı!");
      message.channel.stopTyping();
      return;
    }

    var embed = new Discord.RichEmbed()
      .setAuthor(result.accountName, "", url)
      .setDescription("")
      .addField("Kazanılan Maçlar", result.wins)
      .addField("Oynanılan Oyunlar", result.matches)
      .addField("Kazanma Oranı", ~~result.wr + "%")
      .addField("Toplam Öldürme", +result.kills)
      .addField("K/D", +result.kd)
      .setColor("BLUE")
      .setURL(url)
      .setThumbnail(result.skinUrl);

    message.channel.stopTyping();
    message.channel.send(embed);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fn"],
  category: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: "fortnite",
  description: "Fortnite bilgilerini gösterir.",
  usage: "fortnite <platform> <kullanıcı adı>"
};
