const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../functions.js");

module.exports.run = async (bot, message, args) => { 
     
    const logChannel = message.guild.channels.find(c => c.name === "logs") || message.channel;

    if (message.deletable) message.delete();

    // No args
    if (!args[0]) {
      return message.reply("Lütfen bir kişi belirtin.")
            .then(m => m.delete(5000));
    }

    // No reason
    if (!args[1]) {
      return message.reply("Lütfen bir sebep belirtin.")
            .then(m => m.delete(5000));
    }

    // No author permissions
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      return message.reply("❌ Üyeleri atmak için izniniz yok.")
            .then(m => m.delete(5000));
    }

    // No bot permissions
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.reply("❌ Üyeleri atmak için iznim yok.")
            .then(m => m.delete(5000));
    }

    const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

    // No member found
    if (!toKick) {
      return message.reply("Bu üye bulunamadı, tekrar dene.")
            .then(m => m.delete(5000));
    }

    // Can't kick urself
    if (toKick.id === message.author.id) {
      return message.reply("Kendini atmazsın...")
            .then(m => m.delete(5000));
    }

    // Check if the user's kickable
    if (!toKick.kickable) {
      return message.reply("Sanırım rol hiyerarşisi nedeniyle o kişiyi atamam.")
            .then(m => m.delete(5000));
    }
            
    const embed = new RichEmbed()
        .setColor("#ff0000")
        .setThumbnail(toKick.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(stripIndents`
        **> Atılan Kullanıcı:** ${toKick} (${toKick.id})
        **> Atan Kişi:** ${message.member} (${message.member.id})
        **> Sebep:** ${args.slice(1).join(" ")}`);

    const promptEmbed = new RichEmbed()
        .setColor("GREEN")
      .setAuthor(`Bu doğrulama 30 saniye sonra geçersiz hale gelir.`)
      .setDescription(`Atmak mı istiyorsun ${toKick}?`)

    // Send the message
      await message.channel.send(promptEmbed).then(async msg => {
        // Await the reactions and the reactioncollector
        const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

        // The verification stuffs
        if (emoji === "✅") {
            msg.delete();

            toKick.kick(args.slice(1).join(" "))
                .catch(err => {
                  if (err) return message.channel.send(`Peki .... atma işe yaramadı. İşte hata ${err}`)
                });

            logChannel.send(embed);
        } else if (emoji === "❌") {
            msg.delete();

            message.reply(`Atma iptal edildi.`)
                .then(m => m.delete(10000));
        }
    });
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kick'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kullanıcıyı soru sorarak kickler.',
  usage: 'kick <@kullanıcı>'
};

