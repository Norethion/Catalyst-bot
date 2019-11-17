const Discord = require('discord.js');
const shorten = require('isgd');
const fs = require('fs');

module.exports.run = (client, message, args, tools) => {


    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;

    message.delete();
    if (!args[0]) return message.channel.send(' ``` \n » Kullanım: {lkısalt} <URL> <isim> \n » Örnek: {kısalt} https://www.spacex.com \n ``` ')

    if (!args[1]) {

        shorten.shorten(args[0], function (res) {
            if (res.startsWith('Hata:')) message.channel.send('**:x: | Lütfen Doru URL Girin**');

            message.channel.send(`**<${res}>**`);
        })
    } else {
        shorten.custom(args[0], args[1], function (res) {

            if (res.startsWith('Hata:')) message.channel.send(`**<${res}>**`);

            message.channel.send(`**<${res}>**`);
        })
    }

};


module.exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 2
};

module.exports.help = {
    name: 'lkısalt',
    description: 'İstediğiniz URL\'yi Kısaltır.',
    usage: 'lkısalt'
};
