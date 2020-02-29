module.exports.run = async (bot, message, args) => {
  if (message.deletable) {
    message.delete();
  }

  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message
      .reply("**Üzgünüm. Bunu yapamazsın.**")
      .then(m => m.delete(5000));
  }

  if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
    return message
      .reply("**Lütfen bir değer girin**")
      .then(m => m.delete(5000));
  }

  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
    return message
      .reply("Üzgünüm. Mesaj silme yetkim yok.")
      .then(m => m.delete(5000));
  }

  let deleteAmount;

  if (parseInt(args[0]) > 100) {
    deleteAmount = 100;
  } else {
    deleteAmount = parseInt(args[0]);
  }

  message.channel
    .bulkDelete(deleteAmount, true)
    .then(deleted =>
      message.channel.send(`\`${deleted.size}\` adet mesaj silindi.`)
    )
    .catch(err => message.reply(`Bir şeyler ters gitti ${err}`))
    .then(m => m.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["clear"],
  ategory: "admin",
  permLevel: 1
};

exports.help = {
  name: "temizle",
  description: "İstediğiniz kadar mesaj temizler.",
  usage: "temizle <miktar>"
};
