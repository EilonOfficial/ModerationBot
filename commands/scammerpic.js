exports.run = async function (bot, message) {
  var scammers = ["scammers/img1.jpg", "scammers/img2.jpg", "scammers/img3.jpg", "scammers/img4.png", "scammers/img5.jpg", "scammers/img6.jpg"]
  let rand = scammers[Math.floor(Math.random() * scammers.length)]
  message.channel.sendFile(rand)
}

exports.help = {
  name: "scammermeme",
  description: "Shows A Random Meme Of A Scammer.",
  usage: "scammermeme"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: ["scammerpic", "scammerpicture", "scammerimage", "scammerimg"] 
}
