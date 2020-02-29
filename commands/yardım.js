const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, params) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  /*if (!params[0]) {
    message.channel.sendCode(
      "asciidoc",
      `= Catalyst Bot Yardım Menüsü =
​
 ${prefix}eğlence        ::  Eğlence komutlarını gösterir.
 ${prefix}kullanıcı      ::  Kullanıcı komutlarını gösterir.
 ${prefix}yetkili        ::  Yetkili komutlarını gösterir.
 ${prefix}ekstra         ::  Ekstra komutları gösterir.
 ${prefix}nsfw           ::  NSFW komutlarını gösterir.
 ${prefix}muzik          ::  Müzik botumuzun davetini gönderir.
​
# Komutlar hakkında yardım almak için ${prefix}yardım <komut ismi>`
    );
  } else*/ {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.sendCode(
        "asciidoc",
        `= ${command.help.name} =
​
Hakkında  :: ${command.help.description}
Kullanım  :: ${prefix}${command.help.usage}`
      );
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["y"],
  category: "admin",
  permLevel: 0
};

exports.help = {
  name: "y",
  description: "Bilgi almak istediğiniz komutu gösterir.",
  usage: "y <komut>"
};
