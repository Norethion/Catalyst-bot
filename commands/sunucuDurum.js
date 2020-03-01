const Discord = require("discord.js");

exports.run = (bot, message, params) => {
  let onl = message.guild.members.filter(m => m.presence.status === "online")
    .size;
  let off = message.guild.members.filter(m => m.presence.status === "offline")
    .size;
  let idle = message.guild.members.filter(m => m.presence.status === "idle")
    .size;
  let dnd = message.guild.members.filter(m => m.presence.status === "dnd").size;
  let botlar = message.guild.members.filter(member => member.user.bot).size;
  let üye = message.guild.memberCount;
  const embed = new Discord.RichEmbed()
    .setColor("#36393F")
    .setAuthor(`${message.guild.name}`, message.guild.userURL)
    .setThumbnail(message.guild.iconURL)
    .addField(
      `__**İsim kısaltması:**__`,
      `**${message.guild.nameAcronym}**`,
      true
    )
    .addField(`__**Kimliği:**__`, `||${message.guild.id}||`, true)
    .addField(`__**Bölgesi:**__`, `» **${message.guild.region}**`, true)
    .addField(`__**Sahibi:**__`, `» **${message.guild.owner}**`, true)
    .addField(
      `__**Doğrulama seviyesi:**__`,
      `» **${message.guild.verificationLevel}**`,
      true
    )
    .addField(
      `__**Üyeler:**__`,
      `${üye} Üye 
        <:onl:683414693825609733> Çevrimiçi:**${onl}**
        <:off:683414796774932487> Rahatsız Etmeyin:**${dnd}**
        <:wait:683414863942254684> Boşta:**${idle}**
        <:unsee:683414914303262775> Görünmez:**${off}**
        <:bots:683414999867326537> Botlar:**${botlar}**`,
      true
    )
    .addField(
      `__**Varsayılan rol:**__`,
      `» **${message.guild.defaultRole}**`,
      true
    )
    .addField(`__**Roller:**__`, `» **${message.guild.roles.size}**`, true)
    .addField(
      `__**Kanallar:**__`,
      `» **${
        message.guild.channels.filter(chan => chan.type === "voice").size
      } Sesli** \n » **${
        message.guild.channels.filter(chan => chan.type === "text").size
      } Metin**`,
      true
    )
    .addField(
      `__**Kanal sayısı:**__`,
      `» **${message.guild.channels.size}**`,
      true
    )
    .addField(`__**AFK kanalı:**__`, `» **${message.guild.afkChannel}**`, true)
    .addField(
      `__**AFK zaman aşımı:**__`,
      `» **${message.guild.afkTimeout}**`,
      true
    )
    .addField(
      `__**Oluşturma tarihi:**__`,
      `» **${message.guild.createdAt}**`,
      true
    )
    .setFooter(`Catalyst Bot`, message.guild.iconURL)
    .setTimestamp();
  message.channel.send({ embed });
  message.react("✅");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucudurum"],
  category: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: "sunucubilgi",
  description: "Sunucu bilgisini gösterir.",
  usage: "sunucubilgi"
};
