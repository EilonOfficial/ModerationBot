exports.run = async function (bot, message) {
  let arts = ["./memes/meme1.gif", "./memes/meme3.gif", "./memes/meme4.jpg", "./memes/meme5.gif", "./memes/meme6.png"]
  let art = arts[Math.floor(Math.random() * arts.length)]
  message.channel.send({file: art})
}

exports.help = {
  name: "cyberart",
  description: "Shows some CyberVision Art.",
  usage: "cyberart"
}

exports.config = {
  enabled: true,
  guildOnly: false,
  permlevel: 0,
  aliases: []
}
