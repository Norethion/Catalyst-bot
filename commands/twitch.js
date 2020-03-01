var request = require("request");
var Discord = require("discord.js");
var twitchClientID = "8so4k721btg5cfq6ay2kse93dppa8b";
var twitchSecret = "li011l80j7vegwqm9xu5p9acc2x2y7";

exports.run = async (bot, message, channelName, description) => {
  if (channelName != null && !channelName.includes(" ")) {
    var url = "https://api.twitch.tv/helix/";
    var options = {
      url: `${url}streams?user_login=${channelName}`,
      headers: {
        "Client-ID": `${twitchClientID}`
      }
    };
    request(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        var streamdata = JSON.parse(body);
        if (streamdata.data.length === 0) {
          request(
            {
              url: `${url}users?login=${channelName}`,
              headers: {
                "Client-ID": `${twitchClientID}`,
                Authorization: `Bearer ${twitchSecret}`
              }
            },
            (err, res, body) => {
              var parseddata = JSON.parse(body);

              var data = {
                title: `${channelName}`,
                description: "Yayın Kapalı",
                color: 0x4b367c,
                url: `http://twitch.tv/${channelName}`
              };
              var embed = new Discord.RichEmbed(data);

              embed.setImage(parseddata.data[0].offline_image_url);

              message.channel.send(embed);
            }
          );
        } else {
          var d = streamdata.data[0];
          var data = {
            title: `${channelName}`,
            description:
              streamdata.data.length !== 0 ? `${d.title}` : "Yayın Kapalı",
            color: 0x4b367c,
            url: `http://twitch.tv/${channelName}`
          };
          var embed = new Discord.RichEmbed(data);
          var imageUrl = `https://static-cdn.jtvnw.net/previews-ttv/live_user_`;
          embed.setImage(`${imageUrl}${channelName}-1280x720.jpg`);

          message.channel.send(embed);
        }
      }
    });
  } else {
    message.channel.send(":)");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tw"],
  category: "kullanıcı",
  permLevel: 0
};

exports.help = {
  name: "twitch",
  description:
    "Twitch yayıncısının yayında olup olmadığı hakkında bilgi verir.",
  usage: "twitch <yayıncı>"
};
