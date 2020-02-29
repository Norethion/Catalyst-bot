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
      `= Eğlence Menüsü =

 ${prefix}kedi         ::  Rastgele kedi görseli atar.
 ${prefix}leet         ::  Yazdığınız yazıyı leet türüne çevirir.
 ${prefix}mesajdöndür  ::  Mesajınızı tersden yazar.
 ${prefix}mesajküçült  ::  Mesajınızı küçültür.
 ${prefix}pixel        ::  Avatarınızı pixelleştirir.
 ${prefix}rip          ::  Profil fotoğrafınıza RIP efekti uygular.
 ${prefix}hapishane    ::  Profil fotoğrafınıza hapishane efekti uygular.
 ${prefix}gta          ::  Profil fotoğrafınıza GTAV efekti uygular.
 ${prefix}slots        ::  Slots oyunu oynatır.
 ${prefix}balıktut     ::  Balık tutarsın.
 ${prefix}yazıtura     ::  Yazı-Tura atar.
 ${prefix}8ball        ::  8ball sorularınızı cevaplar.
 ${prefix}csgo-kasa-aç ::  CS:GO kasa açma simülasyonudur.
 ${prefix}sayı-tahmin  ::  Rastgele rakam belirler ve siz o rakamı bulmaya çalışırsınız.

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
  aliases: ["eglence"],
  category: "fun",
  permLevel: 0
};

exports.help = {
  name: "eğlence",
  description: "Eğlence komutlarını gösterir.",
  usage: "eğlence"
};
