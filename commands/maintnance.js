exports.run = async function (bot, message) {
  bot.user.setPresence({ status: 'offline', game: { name: "Maintnance" } })
}

exports.help = {
  name: "maintnance",
  description: "Sets The Bot To Maintnance Mode",
  usage: "maintnance"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 20, 
  aliases: [] 
}
