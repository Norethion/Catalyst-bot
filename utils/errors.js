const Discord = require('discord.js');
const fs = require("fs");

module.exports.noPerms = (message, perm) =>{
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setTitle("İzinsiz")
    .setColor("#42daf5")
    .addField("Yetersiz İzin", perm);

    message.channel.send(embed).then(m => m.delete(5000));
}