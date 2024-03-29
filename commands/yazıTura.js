const Discord = require("discord.js");
const chancejs = require("chance");
const chance = new chancejs();

const cevaplar = ["**TURA**", "**YAZI**"];

exports.run = function(client, message) {
  var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

  if (cevap === "**YAZI**") {
    const embedyazı = new Discord.RichEmbed()
      .setColor(0xf4b942)
      .setDescription(cevap)
      .setThumbnail(
        "http://www.freakonomics.com/wp-content/uploads/2013/01/coin-300x218.jpg"
      );
    message.channel.send(embedyazı);
  } else if (cevap === "**TURA**") {
    const embedtura = new Discord.RichEmbed()
      .setColor(0xf4b942)
      .setDescription(cevap)
      .setThumbnail(
        "https://www.wallets-online.com/webadmin/items/ogon/ogon_cd_red_1.jpg"
      );
    message.channel.send(embedtura);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yazıt", "turay", "ytura", "tyazı"],
  category: "fun",
  permLevel: 0
};

exports.help = {
  name: "yazıtura",
  description: "Yazı-Tura atar.",
  usage: "yazıtura"
};
