const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, params) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  if (!params[0]) {
    message.channel.sendCode(
      "asciidoc",
      `= Yetkili Menüsü =

 ${prefix}ban             ::  İstediğiniz kişiyi soru sorarak banlar.
 ${prefix}kick            ::  İstediğiniz kişiyi soru sorarak kickler.
 ${prefix}cl-engel        ::  Capslock kullanımını engeller.
 ${prefix}davetsayısı     ::  Sunucunuzda ki davet linklerinden kaç tane olduğunu gösterir.
 ${prefix}emojiekle       ::  Sunucuya emoji eklersiniz.
 ${prefix}kilitaç         ::  Kanalın kilidini açar.
 ${prefix}kilitle         ::  Kanalı istediğiniz kadar süreyle kitler.
 ${prefix}kbilgi          ::  İstediğiniz kullanıcını bilgilerini gösterir.
 ${prefix}lkısalt         ::  İstediğiniz URL\'yi Kısaltır.
 ${prefix}prefix          ::  Prefixinizi değiştirir.
 ${prefix}reklam-taraması ::  Kullanıcıların Oynuyor mesajındaki ve Kullanıcı adlarındaki reklamları tarar.
 ${prefix}rolekle         ::  İstediğiniz kullanıcıya rol ekler.
 ${prefix}rolsil          ::  İstediğiniz kullanıcıdan rol alır.
 ${prefix}söyle           ::  Bota istediğinizi söyletir.
 ${prefix}slowmode        ::  Sohbete yazma sınırı <süre> ekler.
 ${prefix}sürelimute      ::  Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.
 ${prefix}temizle         ::  İstediğiniz kadar mesaj temizler.
 ${prefix}duyuru          ::  Duyuru yapar.
 ${prefix}banlananlar     ::  Sunucundan Banlanan üyeleri gösterir.
 ${prefix}çekiliş         ::  Çekiliş yapmanızı sağlar.
 ${prefix}oylama          ::  Oylama başlatır.
 ${prefix}zamanlayıcı     ::  Zaman kurmak için kullanılır.

# Komutlar hakkında yardım almak icin ${prefix}yardım <komut ismi>`
    );
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode(
        "asciidoc",
        `= ${command.help.name} =
​
Hakkında  :: ${command.help.description}
Kullanım  :: ${prefix}${command.help.usage}`
      );
    }
  }
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  category: "admin",
  permLevel: 2
};

exports.help = {
  name: "yetkili",
  description: "Yetkili komutlarını gösterir.",
  usage: "yetkili"
};
