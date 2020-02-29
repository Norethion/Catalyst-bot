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
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Böyle bir rol bulunamadı.");

  if (!rMember.roles.has(gRole.id))
    return message.reply("Aradığın rol istediğin kişi de bulunamadı.");
  await rMember.removeRole(gRole.id);

  try {
    await rMember.send(`Üzgünüz, şu rol elinden alındı -${gRole.name}-.`);
  } catch (e) {
    message.channel.send(
      `Üzgünüz <@${rMember.id}> Şu rol elinden alındı -${gRole.name}-. NOT: Bu mesaj kullanıcıya DM'den ulaşılamadığı için buraya atılmıştır.`
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
  name: "rolsil",
  description: "İstediğiniz kullanıcıdan rol alır.",
  usage: "rolsil <@kullanıcı> <@rol>"
};
