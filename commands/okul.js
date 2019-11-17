const Discord = require("discord.js");
const ms = require("parse-ms");

exports.run = async (client, message, args) => {
    let okul = new Date("2020-06-19:00:00");
    let zaman = ms(okul - Date.now());
    message.channel.send(
        `Okul kapanış **${zaman.days}** gün **${zaman.hours}** saat **${zaman.minutes}** dakika **${zaman.seconds}** saniye kaldı!`
    );
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "okulkapanış",
    description: "Okulların ne zaman kapanacağını gösterir.",
    usage: "okulkapanış"
};