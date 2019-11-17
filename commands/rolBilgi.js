const Discord = require("discord.js");
const superagent = require("superagent");
const fs = require("fs");

exports.run = async (bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;

    var rol = message.content.split(" ").slice(1).join(" ");
    let role = message.guild.roles.find("name", `${rol}`)
    var hata = new Discord.RichEmbed()
        .setColor("#36393F")
        .setDescription(`❌ Lütfen bir rol ismi yazın! Örnek: ${prefix}rolbilgi Üye`);

    if (!role) return message.channel.send(hata);

    var moment = require("moment");
    var temps = moment(message.createdTimestamp).format("LLLL");
    var roleinfoEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .addField('✏ Rol İsmi', role.name, true)
        .addField('🆔 ID', role.id, true)
        .addField('👥 Role Sahip Kullanıcılar', role.members.size, true)
        .addField('💙 Renk', role.hexColor, true)
        .addField('📣 Etiketleme?', role.mentionable ? '\nEvet' : 'Hayır', true)
        .addField('📅 Oluşturulduğu Zaman', moment(role.createdAt).format("LL"), true)
        .setFooter('Catalyst Bot', bot.user.avatarURL)
    message.channel.send(roleinfoEmbed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rolinfo', 'rolhakkında', 'rolbilgi'],
    permLevel: 0
};

exports.help = {
    name: 'rolbilgi',
    description: 'İstediğiniz rol hakkında bilgi verir.',
    usage: 'rolbilgi <rolismi>'
};