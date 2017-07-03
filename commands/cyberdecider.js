exports.run = async function (bot, message) {
  var args = message.content.split(/[ ]+/)
  let decider = ["Yes", "No"]
  let rand = decider[Math.floor(Math.random() * decider.length)]
  if(args.length === 1){
    message.channel.send('You Did Not Provide An Argument. **Usage:** `+cyberdecider [Question]`')
  } else {
    message.reply(rand)
  }
}

exports.help = {
  name: "cyberdecider",
  description: "Outputs Either Yes Or No Randomly",
  usage: "cyberdecider [Question]"
} 

exports.config = {
  enabled: true, 
  guildOnly: false, 
  permlevel: 0, 
  aliases: [] 
}
