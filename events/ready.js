const moment = require('moment');
const Discord = require('discord.js');

module.exports = bot => {

  console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] BOT: ${bot.user.username} ismi ile giriş yapıldı!`);
  bot.user.setStatus("online");
  bot.user.setGame(".yardım " + bot.guilds.size + " Sunucu " + bot.users.size + " Kullanıcı ", "https://twitch.tv/norethion");
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + bot.channels.size + ` adet kanala, ` + bot.guilds.size + ` adet sunucuya ve ` + bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
}