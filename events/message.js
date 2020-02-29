const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let talkedRecently = new Set();

module.exports = message => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);

  let bot = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = bot.elevation(message);

  if (!bot.commands.has(command)) {
    if (bot.aliases.has(command)) {
      //return false;
    } else {
      message.channel.send(
        `Komutlarımda \`\`${command}\`\` adında bir komut bulamadım! Komut listesine bakmak için: \`\`${prefix}yardım\`\``
      );
    }
  }
  //
  const cmd =
    bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
  if (cmd) {
    if (cmd.conf.enabled === false) {
      if (
        !ayarlar.sahip.includes(message.author.id) &&
        !ayarlar.sahip.includes(message.author.id)
      ) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 4) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.RichEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`
          )
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 5) {
      if (!ayarlar.sahip.includes(message.author.id)) {
        const embed = new Discord.RichEmbed()
          .setDescription(`Bu komutu sadece **Sahibim** kullanabilir!`)
          .setColor("RED");
        message.channel.send({ embed });
        return;
      }
    }
  }
  //

  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(bot, message, params, perms);
  }
};
