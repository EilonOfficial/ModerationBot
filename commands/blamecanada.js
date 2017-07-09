exports.run = async function (bot, message) {
  message.channel.send('https://www.youtube.com/watch?v=bOR38552MJA')
}

exports.help = {
  name: "blamecanada",
  description: "Blames Canada",
  usage: "blamecanada"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
