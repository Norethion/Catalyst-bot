const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../functions.js");

module.exports = {
  run: async (bot, message, args) => {
    const logChannel =
      message.guild.channels.find(c => c.name === "logs") || message.channel;

    if (message.deletable) message.delete();

    // No args
    if (!args[0]) {
      return message
        .reply("Lütfen yasaklanacak bir kişi belirtin.")
        .then(m => m.delete(5000));
    }

    // No reason
    if (!args[1]) {
      return message
        .reply("Lütfen yasaklamak için bir sebep belirtin.")
        .then(m => m.delete(5000));
    }

    // No author permissions
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message
        .reply("❌ Üyeleri yasaklama izniniz yok.")
        .then(m => m.delete(5000));
    }
    // No bot permissions
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      return message
        .reply("❌ Üyeleri yasaklama iznim yok.")
        .then(m => m.delete(5000));
    }

    const toBan =
      message.mentions.members.first() || message.guild.members.get(args[0]);

    // No member found
    if (!toBan) {
      return message
        .reply("Bu üye bulunamadı, tekrar dene")
        .then(m => m.delete(5000));
    }

    // Can't ban urself
    if (toBan.id === message.author.id) {
      return message
        .reply("Kendini yasaklayamazsın...")
        .then(m => m.delete(5000));
    }

    // Check if the user's banable
    if (!toBan.bannable) {
      return message
        .reply("Sanırım rol hiyerarşisi nedeniyle bu kişiyi yasaklayamam.")
        .then(m => m.delete(5000));
    }

    const embed = new RichEmbed()
      .setColor("#ff0000")
      .setThumbnail(toBan.user.displayAvatarURL)
      .setFooter(message.member.displayName, message.author.displayAvatarURL)
      .setTimestamp().setDescription(stripIndents`
            **> Yasaklanan:** ${toBan} (${toBan.id})
            **> Yasaklayan:** ${message.member} (${message.member.id})
            **> Sebep:** ${args.slice(1).join(" ")}`);

    const promptEmbed = new RichEmbed()
      .setColor("GREEN")
      .setAuthor(`Bu doğrulama 30 saniye sonra geçersiz hale gelir.`)
      .setDescription(`Yasaklamak istiyor musun ${toBan}?`);

    // Send the message
    await message.channel.send(promptEmbed).then(async msg => {
      // Await the reactions and the reactioncollector
      const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

      // Verification stuffs
      if (emoji === "✅") {
        msg.delete();

        toBan.ban(args.slice(1).join(" ")).catch(err => {
          if (err)
            return message.channel.send(
              `Şey ... yasak işe yaramadı. İşte hata ${err}`
            );
        });

        logChannel.send(embed);
      } else if (emoji === "❌") {
        msg.delete();

        message.reply(`Yasaklama iptal edildi.`).then(m => m.delete(10000));
      }
    });
  }
};
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  category: "admin",
  permLevel: 3
};

module.exports.help = {
  name: "ban",
  description: "İstediğiniz kişiyi soru sorarak banlar.",
  usage: "ban <@kullanıcı>"
};
