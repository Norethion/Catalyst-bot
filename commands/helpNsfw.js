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

  if (!params[0]) {
    message.channel.sendCode(
      "asciidoc",
      `= NSFW Menüsü =

 ${prefix}n        ::  ass/pussy/anal/pgif/hentai/4k/gonewild
 
# Komutlar hakkında yardım almak icin ${prefix}yardım <komut ismi>`
    );
  } else {
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
  enabled: false,
  guildOnly: false,
  aliases: [],
  category:"admin",
  permLevel: 5
};

exports.help = {
  name: "nsfw",
  description: "NSFW komutlarını gösterir.",
  usage: "nsfw"
};
