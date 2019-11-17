const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");

exports.run = async (bot, message, args) => {
  const seksizaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikler = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setFooter('Catalyst Bot  \'Buyur benim istatistiklerim', bot.user.avatarURL)
    .addField("» :spy: **Botun Sahibi**", "<@286158318450245632>| Ali#7788")
    .addField("» :spy: **Geliştirici** ", "<@286158318450245632>")
    .addField("» :desktop: **Bellek kullanımı**", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)
    .addField("» :construction_worker: **Çalışma süresi**", seksizaman)
    .addField("» :busts_in_silhouette: **Kullanıcılar**", bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
    .addField("» :clipboard: **Sunucular**", bot.guilds.size.toLocaleString(), true)
    .addField("» :tv: **Kanallar**", bot.channels.size.toLocaleString(), true)
    .addField('» :headphones: **Müzik Çalınan Sunucu Sayısı**', bot.voiceConnections.size)
    .addField("» **Discord.JS sürüm**", "v" + Discord.version, true)
    .addField("» **Node.JS sürüm**", `${process.version}`, true)
    .addField("» :timer: **Ping**", bot.ping + " ms", true)
    .addField("» **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
    .addField("» **Bit**", `\`${os.arch()}\``, true)
    .addField("» **İşletim Sistemi**", `\`\`${os.platform()}\`\``)
    .addField('» :paperclip: **Botun Başlanma Zamanı**', "Bot **23.07.2019**'de yapılmaya başlanmıştır.")
    .addField("**» Bot Davet**", " [Davet Et](https://discordapp.com/oauth2/authorize?client_id=603246546791694382&scope=bot&permissions=2146958847)")
  return message.channel.send(istatistikler);
};


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['istatistik', 'botbilgi', 'bot-bilgi', 'i'],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Botun istatistiklerini gösterir.',
  usage: 'istatistik'
};