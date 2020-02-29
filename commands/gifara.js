const request = require("request-promise-native");
const fs = require("fs");

exports.run = async (Bastion, message, args) => {
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }
  let prefix = prefixes[message.guild.id].prefixes;

  if (message.channel.nsfw) {
    try {
      if (args.length < 1) {
        return message.reply(
          `**Doğru Kullanım**: ${prefix}gifara <aranacak gif>`
        );
      }
      let options = {
        url: "http://api.giphy.com/v1/gifs/search",
        qs: {
          q: encodeURI(args.join("+")),
          api_key: "dc6zaTOxFJmzC",
          limit: 10,
          offset: 0
        },
        json: true
      };
      let response = await request(options);
      if (response.data.length) {
        message.channel
          .send({
            embed: {
              color: 0x00ae86,
              title: `GIF aranıyor: ${args.join(" ")}`.slice(0, 256),
              image: {
                url:
                  response.data[
                    Math.floor(Math.random() * response.data.length)
                  ].images.original.url
              }
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        return Bastion.emit(
          "hata",
          "",
          Bastion.i18n.error(message.guild.language, "bulunamadı", "görsel"),
          message.channel
        );
      }
    } catch (e) {
      if (e.response) {
        return Bastion.emit(
          "hata",
          e.response.statusCode,
          e.response.statusMessage,
          message.channel
        );
      }
      console.log(e);
    }
  } else {
    message.channel.send("Üzgünüm. Nfsw kanalda değilsin.");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  category: "kullanıcı",
  permLevel: 0
};
exports.help = {
  name: "gifara",
  description: "Mesajınızla ilgili gifleri Giphy'da aratır.",
  usage: "gifara <aranacak gif>"
};
