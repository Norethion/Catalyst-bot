const Discord = require("discord.js");
const ms = require("ms");
const fs = require('fs');


var mutelirolu = "muted" //MUTELENDİGİ ZAMAN VERİLECEK ROLU  BURAYA YAZINIZ...

module.exports.run = async (bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;

    let mutekisi = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!mutekisi) return message.reply(`:warning: Lütfen bir kullanıcı etiketleyiniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
    if (mutekisi.hasPermission("MANAGE_MESSAGES")) return message.reply(`:warning: Yetkili bir kişiyi muteleyemem! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)
    let muterol = message.guild.roles.find(`name`, mutelirolu);
    if (!muterol) {
        try {
            muterol = await message.guild.createRole({
                name: mutelirolu,
                color: "#000000",
                permissions: []
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterol, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e.stack);
        }
    }
    let mutezaman = args[1]
        .replace(`sn`, `s`)
        .replace(`dk`, `m`)
        .replace(`sa`, `h`)
        .replace(`g`, `d`)

    if (!mutezaman) return message.reply(`:warning: Lütfen bir zaman giriniz! \nDoğru Kullanım; \`${prefix}mute <@kullanıcı> <1sn/1dk/1sa/1g>\``)

    await (mutekisi.addRole(muterol.id));
    message.reply(`<@${mutekisi.id}> kullanıcısı ${args[1]} boyunca mutelendi!`);

    setTimeout(function () {
        mutekisi.removeRole(muterol.id);
        message.channel.send(`<@${mutekisi.id}> kullanıcısının mutelenme süresi sona erdi!`);
    }, ms(mutezaman));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
};

exports.help = {
    name: "sürelimute",
    description: "Etiketlediğiniz kişiye belirttiğiniz süre kadar mute atar.",
    usage: "sürelimute <@kullanıcı> <1sn/1dk/1sa/1g>"
};