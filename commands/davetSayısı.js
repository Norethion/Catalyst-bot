const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let guild = message.guild;

  guild
    .fetchInvites()
    .then(invites =>
      message.channel.send(`Sunucunuzda ${invites.size} davet linki mevcut!`)
    )
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["davets"],
  category: "admin",
  permLevel: 1
};

exports.help = {
  name: "davetsayısı",
  description: "Sunucunuzda ki davet linklerinden kaç tane olduğunu gösterir.",
  usage: "davetsayısı"
};
