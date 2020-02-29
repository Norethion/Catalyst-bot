const Discord = require("discord.js");
const google = require("google-tts-api");
const fs = require("fs");

exports.run = (client, message) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  const args = message.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel)
    return message.channel.send(`İlk önce bir sesli kanala girmeniz gerek`);

  google(`${args.slice(" ")}`, "tr", 1).then(url => {
    message.member.voiceChannel.join().then(connection => {
      message.channel.send(
        `**${args.slice(" ")}** adlı mesaj sesli olarak söyleniyor`
      );
      connection.playStream(url).on("end", () => {
        connection.disconnect();
      });
    });
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say", "tts"],
  ategory: "fun",
  permLevel: 0
};

exports.help = {
  name: "tts",
  description: "Bota yazdığınız şeyi sesli mesaj olarak söyletir",
  usage: "tts <mesaj>"
};
