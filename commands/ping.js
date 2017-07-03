exports.run = async function (bot, message) {
  message.channel.send("Pong!")
}

exports.help = {
  name: "ping",
  description: "Ping/Pong command.",
  usage: "ping"
}

exports.config = {
  enabled: true,
  guildOnly: false,
  permlevel: 0,
  aliases: []
}
