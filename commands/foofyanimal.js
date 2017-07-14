exports.run = async function (bot, message) {
  const random = require("random-animal"); 
var randomanimalaray = [random.dog(),random.cat()]
let Choose = randomanimalaray[Math.floor(Math.random() * randomanimalaray.length)]
message.channel.send(Choose.then(url => message.channel.send(url)))
}

exports.help = {
  name: "foofyanimal",
  description: "FOOFY CREATURES",
  usage: "foofyanimal"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}

