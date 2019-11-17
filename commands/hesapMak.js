const Discord = require('discord.js');
const math = require('math-expression-evaluator')
const stripIndents = require('common-tags').stripIndents
const fs = require('fs');

exports.run = function (client, message, args) {
let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

if(!prefixes[message.guild.id]){
  prefixes[message.guild.id] = {
    prefixes: botconfig.prefix
  };
}
let prefix = prefixes[message.guild.id].prefixes;

    var soru = args.join(' ');

    if (!soru) return message.reply(`Bir işlem belirtin. **Doğru Kullanım**: ${prefix}hesapla <işlem>`)
    else {
        let cevap;
        try {
            cevap = math.eval(soru)
        } catch (err) {
            message.channel.send('Hatalı işlem: **' + err)
        }

        const embed = new Discord.RichEmbed()
            .addField('Soru', soru)
            .addField('Cevap', cevap)

        message.channel.send(embed)
    }


};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'hesapla',
    description: 'Belirtilen işlemi yapar.',
    usage: 'hesapla <işlem>'
};