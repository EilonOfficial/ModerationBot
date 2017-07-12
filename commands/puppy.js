exports.run = async function (bot, message) {
const randomPuppy = require('random-puppy');
 
randomPuppy()
    .then(url => {
        message.channel.send(url);
    })
 
}

exports.help = {
  name: "puppy",
  description: "PUPPIES",
  usage: "puppy"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
