
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
        message.channel.sendCode("asciidoc", `= Kullanıcı Menüsü =
​
 ${prefix}davet        ::  Botun davet linkini gönderir.
 ${prefix}ping         ::  Pinginizi gösterir.
 ${prefix}hava         ::  Hava durumunu gösterir
 ${prefix}istatistik   ::  Botun istatistiklerini gösterir.
 ${prefix}sunucubilgi  ::  Sunucu bilgisini gösterir.
 ${prefix}tts          ::  Bota yazdığınız şeyi sesli mesaj olarak söyletir.
 ${prefix}üyebilgi     ::  Üye Durumlarını ve sunucudaki üye sayısını gösterir.
 ${prefix}kanalbilgi   ::  Kanal ile ilgili bilgi verir.
​ ${prefix}rolbilgi     ::  İstediğiniz rol hakkında bilgi verir.
​ ${prefix}roller       ::  Sunucuda bulunan rolleri gösterir.
​ ${prefix}yetkilerim   ::  Sunucudaki yetkilerinizi/izinlerinizi gösterir.

# Komutlar hakkında yardım almak icin ${prefix}yardım <komut ismi>`);
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
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'kullanıcı',
    description: 'Kullanıcı komutlarını gösterir.',
    usage: 'kullanıcı'
};