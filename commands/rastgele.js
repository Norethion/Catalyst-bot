const Discord = require("discord.js")
const request = require("request")
const cheerio = require("cheerio")

module.exports.run = async (bot, message, args) => {
    message.delete()

    const foto = args.slice(0).join(' ')
    if (!foto) return message.channel.send(`Ne fotoğrafı istediğinizi yazmalısınız.`)
    var options = {
        url: `http://results.dogpile.com/serp?qc=images&q=${foto}`,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Opera"
        }
    };
    request(options, function (error, response, responseBody) {
        if (error) {
            return;
        }
        $ = cheerio.load(responseBody);

        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
        const random = urls[Math.floor(Math.random() * urls.length)]
        if (!urls.length) {
            return;
        }
        const embed = new Discord.RichEmbed()
            .setTitle(`${foto} hakkında rastgele fotoğraf.`)
            .setColor("#36393F")
            .setImage(random)
            .setFooter(`${message.author.username} tarafından kullanıldı.`)
        message.channel.send(embed);
    });
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rastgelef'],
    permLevel: 0,
};

exports.help = {
    name: 'rfoto',
    description: 'Rastgele fotoğraf atar.',
    usage: 'rfoto <nesne>',

};