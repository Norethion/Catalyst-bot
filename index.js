const token = require("./token.json");
const ayarlar = require("./ayarlar.json")
const Discord = require("discord.js");
const fs = require("fs");
const moment = require('moment');
const ownerID = '286158318450245632';
const active = new Map();
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cdSeconds = 5;
/*bot.music = require("discord.js-musicbot-addon");

bot.music.start(bot, {
  botPrefix : ".",
  youtubeKey: "AIzaSyDxa8nHi6_ucyJlAAwzCTE25YIT1IAi4L8",
  help: {
    help: "Komutlar için muzik.",
    name: "muzik"
  }
});*/

require('./util/eventLoader')(bot);

const log = message => {
  console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] ${message}`);
};

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    bot.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      bot.aliases.set(alias, props.help.name);
    });
  });
});

//let statuses = ['.yardım']

bot.on('guildCreate', guild => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    prefixes[guild.id] = {
      prefixes: "."
    };

    fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
      if (err) console.log(err)
    });
})

  /* bot.on("ready", async () => {
    console.log(`------- ${bot.user.username} Bot ------- \n> Version: Alpha\n> Aktif\n------- ${bot.user.username} Bot -------`);
      bot.user.setActivity("Kodunun Yapılışını",{type:"watching"})
        setInterval(function() {
        let status = statuses[Math.floor(Math.random()*statuses.length)];
      bot.user.setPresence({game: { name: status }, status:'Online'});
    },5000)
  })*/

bot.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });
      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

bot.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./commands/${command}`);
      bot.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        bot.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

bot.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      bot.commands.delete(command);
      bot.aliases.forEach((cmd, alias) => {
        if (cmd === command) bot.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

bot.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
}


bot.on("message", async message =>{
    

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
  
  /*let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
      prefixes[message.guild.id] = {
        prefixes: botconfig.prefix
      };
    }
    let prefix = prefixes[message.guild.id].prefixes;*/

    /*let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let ops = {ownerID: ownerID, active: active};


    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(message.content[0]===`${prefix}` && commandFile) 
    commandFile.run(bot,message,args,ops);*/

    setTimeout(() =>{
      cooldown.delete(message.author.id)
    }, cdSeconds * 1000)

});

bot.login(token.token);
