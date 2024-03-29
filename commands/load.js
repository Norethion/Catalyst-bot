exports.run = (client, message, args) => {
  var command = args[0];
  message.channel.send("`" + command + "` adlı komut yükleniyor...").then(m => {
    client
      .load(command)
      .then(() => {
        m.edit("`" + command + "` adlı komut başarıyla yüklendi.");
      })
      .catch(e => {
        m.edit(
          `Komut yüklenirken bir hata oluştu: ${command}\n\`\`\`${e.stack}\`\`\``
        );
      });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["l"],
  permLevel: 5
};

exports.help = {
  name: "load",
  description: "[Admin Komutu]",
  usage: "load <komut adı>"
};
