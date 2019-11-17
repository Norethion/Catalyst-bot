const Discord = require('discord.js');
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    if (message.channel.nsfw){
    if(args[0] == "ass"){
        let { body } = await superagent
            .get(`https://nekobot.xyz/api/image?type=ass`);

        let assEmbed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("Ass")
            .setImage(body.message);

        message.channel.send(assEmbed);
    }

    if(args[0] == "pussy"){
        let { body } = await superagent
            .get(`https://nekobot.xyz/api/image?type=pussy`);

        let pussyEmbed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("Pussy")
            .setImage(body.message);

        message.channel.send(pussyEmbed);
    }

    if (args[0] == "4k") {
        let { body } = await superagent
            .get(`https://nekobot.xyz/api/image?type=4k`);

        let kEmbed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("4k")
            .setImage(body.message);

        message.channel.send(kEmbed);
    }

    if (args[0] == "pgif") {
        let { body } = await superagent
            .get(`https://nekobot.xyz/api/image?type=pgif`);

        let pgifEmbed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("Pgif")
            .setImage(body.message);

        message.channel.send(pgifEmbed);
    }

    if (args[0] == "hentai") {
        let { body } = await superagent
            .get(`https://nekobot.xyz/api/image?type=hentai`);

        let hentaiEmbed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("Hentai")
            .setImage(body.message);

        message.channel.send(hentaiEmbed);
    }

    if (args[0] == "anal") {
        let { body } = await superagent
            .get(`https://nekobot.xyz/api/image?type=anal`);

        let analEmbed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("Anal")
            .setImage(body.message);

        message.channel.send(analEmbed);
    }

    if (args[0] == "gonewild") {
        let { body } = await superagent
            .get(`https://nekobot.xyz/api/image?type=gonewild`);

        let gonewildEmbed = new Discord.RichEmbed()
            .setColor("#ff9900")
            .setTitle("Gonewild")
            .setImage(body.message);

        message.channel.send(gonewildEmbed);
    }
}
else
{
    message.channel.send("Üzgünüm. Nfsw kanalda değilsin.")
}
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'n',
    description: 'NSFW komutlarını barındırır.',
    usage: 'n <ass/pussy/anal/pgif/hentai/4k/gonewild>'
};
