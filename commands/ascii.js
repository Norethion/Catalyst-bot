const Discord = require("discord.js");
const Jimp = require("jimp");

exports.run = (client, message, args) => {
  var figlet = require("figlet");
  figlet(args.join(" "), function(err, data) {
    if (err) {
      console.log("Bir şeyler yanlış gitti...");
      console.dir(err);
      return;
    }
    message.delete();
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Ascii;")
      .setDescription("```fix\n" + data + "\n```")
      .setFooter("Catalyst Bot", client.user.avatarURL)
      .setTimestamp();
    message.channel.send(embed);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ascii"],
  category: "fun",
  permLevel: 0
};

exports.help = {
  name: "ascii",
  description: "İstediğiniz şeyi ascii'ye çevirerek bota yazdırır.",
  usage: "ascii <yazdırmak istediğiniz şey>"
};
