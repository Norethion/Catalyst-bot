
const Discord = require('discord.js');
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
        message.channel.sendCode("asciidoc", `= Catalyst Bot Yardım Menüsü =
​
 ${prefix}zamanlayıcı  ::  Zaman kurmak için kullanılır.
 ${prefix}davet-sırası ::  Sunucunuza en çok kullanıcı getirenleri sıralar.
 ${prefix}döviz        ::  Güncel Döviz kurlarını gösterir.
 ${prefix}bitcoin      ::  Ülkelerin bitcoin değerlerini gösterir.
 ${prefix}film-ara     ::  Film ararsınız.
 ${prefix}rfoto        ::  Rastgele fotoğraf atar.
 ${prefix}yılbaşı      ::  Yılbaşına ne kadar kaldığını gösterir.
 ${prefix}okulkapanış  ::  Okulların ne zaman kapanacağını gösterir.
 ${prefix}hesapla      ::  Belirtilen işlemi yapar.
 ${prefix}bug-bildir   ::  Botumuzda oluşan hataları bildirirsiniz
 ${prefix}öneri        ::  Bot hakkındaki önerilerinizi bot sahiplerine ulaştırır.
 ${prefix}lolbilgi     ::  Lol hesabı hakkında bilgi verir.(Türkçe karakterler kullanımında yüksek ihtimal hata verir)
 ${prefix}fortnite     ::  Fortnite bilgilerini gösterir.
 ${prefix}ascii        ::  İstediğiniz şeyi ascii\'ye çevirerek bota yazdırır.
 ${prefix}çevir        ::  Çeviri yapmanızı sağlar.
 ${prefix}qr           ::  Belirtilen metni,url yi qr koda dönüştürür.

# Komutlar hakkında yardım almak için ${prefix}yardım <komut ismi>`);
    } else {
        let command = params[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            message.channel.sendCode('asciidoc', `= ${command.help.name} =
​
Hakkında  :: ${command.help.description}
Kullanım  :: ${prefix}${command.help.usage}`);
        }
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["help"],
    permLevel: 0
};

exports.help = {
    name: 'ekstra',
    description: 'Ekstra kategorilerini gösterir.',
    usage: 'ekstra'
};