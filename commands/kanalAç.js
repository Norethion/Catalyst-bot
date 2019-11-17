const Discord = require('discord.js');
const ms = require('ms');


exports.run = (client, message, args) => {
    
    if (!message.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTimestamp()
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField(':warning: Uyarı :warning:', '`kilitaç` adlı komutu özel mesajlarda kullanamazsın.')
        return message.author.sendEmbed(ozelmesajuyari);
    }
    if (!client.lockit) client.lockit = [];
    let time = args.join(' ');

    message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
    }).then(() => {
        message.channel.send(`**Kanal açıldı.**`).then(m => m.delete(5000))
            .catch(error => {
                console.log(error);
            });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'kilitaç',
    description: 'Kanalın kilidini açar.',
    usage: 'kilitaç'
};