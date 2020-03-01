const Discord = require("discord.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_EMOJIS"))
    return message.channel.send(
      ":no_entry: Bu komutu kullanabilmek için `Emojileri yönet` yetkisine sahip olmalısınız"
    );
  let link = args[0];
  let isim = args[1];
  let guild = message.guild;

  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675632898510028810.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/665169663268880395.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/676092308911030282.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675633806480244776.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675633882887880704.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675632566006448128.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/676041455046754304.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675633079364354050.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675634100018872377.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675634252011929633.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/676061708627869753.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675632806583336986.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/678406664508014622.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/678225148683354143.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675792969793667073.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675632566006448128.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/678223832389124106.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/676045939038748702.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/676053210674364416.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675634532212408321.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/675789361433935873.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/665143762317738014.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/666710081852932137.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/673805604707500053.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/670713851204861977.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/665169662056595467.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/660949031266025513.png?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/662057582134951956.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/673805602581118976.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/677954228756545547.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/681381298719424637.gif?v=1`,
    `catalyst`
  );
  guild.createEmoji(
    `https://cdn.discordapp.com/emojis/681409712499326987.gif?v=1`,
    `catalyst`
  );

  {
    const embed = new Discord.RichEmbed()
      .setColor("GREEN")
      .setDescription(
        `<a:catalyst:678389467882455080> Gif Paketi Başarılı Bir Şekilde Yüklendi.`
      );
    return message.channel.sendEmbed(embed);
  }

  message.channel
    .send(`**Catalyst Gif Paketi** Başarılı Bir Şekilde Yüklendi.`)
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gifpaketi", "gifpaket", "gif-paket", "gif-paketi"],
  category: "admin",
  permLevel: 4
};
exports.help = {
  name: "gifpaketi",
  description: "Sunucuya emoji eklersiniz",
  usage: "gifpaketi"
};
