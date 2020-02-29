const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("Üzgünüm, bunu yapamazsın.");

  let rMember =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  if (!rMember) return message.reply("Kullanıcı bulunamadı!");
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Lütfen bir rol belirt.");
  let gRole = message.guild.roles.find(x => x.name === role);
  if (!gRole) return message.reply("Böyle bir rol bulunamadı.");

  if (rMember.roles.has(gRole.id));
  await rMember.addRole(gRole.id);

  try {
    await rMember.send(`Tebrikler, şu rolu aldın -${gRole.name}-.`);
  } catch (e) {
    message.channel.send(
      `Tebrik ederiz. <@${rMember.id}> Şu rolü aldın -${gRole.name}-. NOT: Bu mesaj kullanıcıya DM'den ulaşılamadığı için buraya atılmıştır.`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  category: "admin",
  permLevel: 4
};

exports.help = {
  name: "rolekle",
  description: "İstediğiniz kullanıcıya rol ekler.",
  usage: "rolekle <@kullanıcı> <@rol>"
};
