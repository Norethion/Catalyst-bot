exports.run = (bot, message, args) => {
  let command;
  if (bot.commands.has(args[0])) {
    command = args[0];
  } else if (bot.aliases.has(args[0])) {
    command = bot.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send("`" + args[0] + "` adında bir komut yok.");
  } else {
    message.channel
      .send("`" + command + "` adlı komut devre dışı bırakılıyor...")
      .then(m => {
        bot
          .unload(command)
          .then(() => {
            m.edit(
              "`" + command + "` adlı komut başarıyla devre dışı bırakıldı."
            );
          })
          .catch(e => {
            m.edit(
              `Komut yeniden başlatılırken bir hata oluştu: ${command}\n\`\`\`${e.stack}\`\`\``
            );
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["u"],
  permLevel: 5
};

exports.help = {
  name: "unload",
  description: "[Admin Komutu]",
  usage: "unload <komut adı>"
};
