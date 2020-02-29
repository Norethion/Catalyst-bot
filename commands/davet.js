const Discord = require("discord.js");

exports.run = async (bot, message, params, args) => {
  const yardım = new Discord.RichEmbed()
    .setColor(0x36393e)
    .setAuthor(`Catalyst Bot`, bot.user.avatarURL)
    .setThumbnail(bot.user.avatarURL)
    .addField(
      ":white_check_mark: **Botu Ekle** ",
      `[TIKLA](https://discordapp.com/oauth2/authorize?client_id=603246546791694382&scope=bot&permissions=2146958847)`
    )
    .setFooter(
      `${message.author.username} tarafından istendi. | © Catalyst Bot.  `,
      message.author.avatarURL
    );
  return message.channel.sendEmbed(yardım);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["botdavet", "davett", "davt", "dave", "daevt"],
  category: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "Botun davet linkini gönderir.",
  usage: "davet"
};
