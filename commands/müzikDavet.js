const Discord = require('discord.js');

exports.run = async (client, message, params, args) => {

    const yardım = new Discord.RichEmbed()
        .setColor(0x36393E)
        .setAuthor(`Phank Bot Davet`)
        .setThumbnail(client.user.avatarURL)
        .addField(":white_check_mark: **Botu Ekle** ", `[TIKLA](https://discordapp.com/oauth2/authorize?client_id=645411466291183677&scope=bot&permissions=2146958847)`)
        .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
    return message.channel.sendEmbed(yardım);

};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunucu'],
    permLevel: 0
};

exports.help = {
    name: 'muzik',
    description: 'Müzik botunun davet linkini gönderir.',
    usage: 'muzik'
};
