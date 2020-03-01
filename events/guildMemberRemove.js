module.exports = member => {
  console.log(`NAME:${member} | ID:${member.id} sunucudan ayrıldı.`);

  const guild = member.guild;
  //panel
  const kanalcık = db.fetch(`botPanel_${member.guild.id}`);
  if (kanalcık) {
    const kanal = guild.channels.find("id", kanalcık);
    if (!kanal) return db.delete(`botPanel_${guild.id}`);
    kanal.setName(`Sunucudaki üye sayısı : ${guild.memberCount}`);
  }
};
