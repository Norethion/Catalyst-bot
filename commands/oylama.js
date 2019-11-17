const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;

    message.delete();
    let question = args.join(' ');
    let user = message.author.username
    if (!question) return message.channel.sendEmbed(new Discord.RichEmbed()
        .setDescription(`❌**Başarısız İşlem** \n  \n \n Doğru Kullanım: ${prefix}oylama <metin>`)).then(m => m.delete(10000));
        message.channel.sendEmbed(new Discord.RichEmbed()
        .setColor("#36393F")
        .setTimestamp()
        .setFooter(`${message.author.username}${message.author.discriminator} Tarafından Başlatıldı`)
        .addField(`**Oylama** \n `, ` \n \n \n **  \n${question}** \n \n \n    `)).then(function (message) {

            message.react('✅');
            message.react('❌');
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['oylama'],
    permLevel: 2
};

exports.help = {
    name: 'oylama',
    description: 'Oylama başlatır.',
    usage: 'oylama <metin>'
};