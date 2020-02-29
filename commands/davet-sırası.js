const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let invites = await message.guild.fetchInvites().catch(error => {
    return message.channel.send("Davetleri göremiyorum yeterli iznim yok");
  });

  invites = invites.array();

  let possibleinvites = [];
  invites.forEach(function(invites) {
    possibleinvites.push(`${invites.inviter.username} || ${invites.uses}`);
  });

  const embed = new Discord.RichEmbed()
    .setTitle(`**DAVET SIRALAMASİ**`)
    .setColor(0xcb5a5e)
    .addField("Davetler", `\`\`\`${possibleinvites.join("\n")}\`\`\``)
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davetsırası"],
  category: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: "davet-sırası",
  description: "Sunucunuza en çok kullanıcı getirenleri sıralar.",
  usage: "davet-sırası"
};
