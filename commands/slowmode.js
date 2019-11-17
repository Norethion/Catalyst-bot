const Discord = require('discord.js');
const fs = require('fs');

exports.run = async (client, message, args) => {


    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;
    
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);

    if (message.channel.type !== "text") return;
    const limit = args[0] ? args[0] : 0;
    if (!limit) {
        var embed = new Discord.RichEmbed()
            .setDescription(`Doğru kullanım: \`${prefix}slowmode [0/10]\``)
            .setColor('RANDOM')
            .setTimestamp()
        message.channel.send({ embed })
        return
    }
    if (limit > 10) {
        return message.channel.sendEmbed(new Discord.RichEmbed().setDescription("Süre limiti maksimum **10** saniye olabilir.").setColor('RANDOM'));
    }
    message.channel.sendEmbed(new Discord.RichEmbed().setDescription(`Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`).setColor('RANDOM'));
    var request = require('request');
    request({
        url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
        method: "PATCH",
        json: {
            rate_limit_per_user: limit
        },
        headers: {
            "Authorization": `Bot ${client.token}`
        },
    })
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["slow-mode", "yavas-mod", 'yavasmod', 'yavaşmod'],
    permLevel: 3,
};

exports.help = {
    name: 'slowmode',
    description: 'Sohbete yazma sınır (süre) ekler.',
    usage: 'slowmode [0/10]',
};