exports.run = async (bot, message, args) => {
  const msg = await message.channel.send(`🏓 Pinging....`);

  msg.edit(`🏓 Pong!
    API Gecikmesi ${Math.round(bot.ping)}ms
    Gecikme ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pin", "pong"],
  category: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: "ping",
  description: "Pinginizi gösterir.",
  usage: "ping"
};
