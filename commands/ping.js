exports.run = async (bot, message, args) => {
    const msg = await message.channel.send(`🏓 Pinging....`);

    msg.edit(`🏓 Pong!
    API Gecikmesi ${Math.round(client.ping)}ms
    Gecikme ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    description: 'Pinginizi gösterir.',
    usage: 'ping'
};