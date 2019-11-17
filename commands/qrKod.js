const qrcode = require("qrcode");
const tempy = require("tempy");

module.exports.run = async (bot, message, args) => {
    const qrOutput = tempy.file({ extension: "png" });
    message.channel.startTyping();
    if (args.length > 0) {
        qrcode.toFile(qrOutput, args.join(" "), { margin: 1 }, (error) => {
            if (error) throw new Error(error);
            message.channel.stopTyping();
            message.channel.send({
                files: [{
                    attachment: qrOutput,
                    name: "valpha.png"
                }]
            });
        });
    } else {
        message.channel.stopTyping();
        message.reply("Bir QR kodu oluşturmak için bir miktar metin girmeniz gerekir!");
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["qrkod"],
    permLevel: 0
};

exports.help = {
    name: "qr",
    description: "Belirtilen metni,url yi qr koda dönüştürür.",
    usage: "qrkod <Metin>",
};