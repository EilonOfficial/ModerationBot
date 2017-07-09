exports.run = async function (bot, message) {
    var args = message.content.split(/[ ]+/)
    if(args.length === 1){
      message.channel.send('You Did Not Provide An Argument. **Usage:** `+submitcyberart [Link (Not File) ]`')
    } else {
       var result = args.join(" ").substring(15)
    message.reply('Are You Sure You Would Like To Submit This? If it is inapropriate your submission may result in a ban | Type \"Yes\" Or \"No\" | Automatically Times Out In 10 Seconds').then(() => {
      message.channel.awaitMessages(response => response.content === 'yes' || response.content === "Yes", {
          max: 1,
          time: 10000,
          errors: ['time'],
      }).then((collected) => {
        try {
          message.channel.send('Your CyberArt Has Been Submitted.')
          message.guild.channels.find("name", "cyberart-submissions").send(result).then(function (message) {
          message.react("👍")
          message.react("👎")
          }).catch(function() {
             });
        } catch (err) {
          console.error(err);
        }
      }).catch(() => {
          if(!message.author.content.includes('Yes') || message.content.includes('yes') || message.content.includes('No') || message.content.includes('no')){
          message.channel.send("Timed Out");
          }
      })
            message.channel.awaitMessages(response => response.content === 'no' || response.content === "No", {
          max: 1,
          time: 10000,
          errors: ['time'],
      }).then((collected) => {
        try {
          message.channel.send('Command Cancelled')
        } catch (err) {
          console.error(err);
        }
      }).catch(() => {
      })
  })
    }
}
exports.help = {
  name: "submitcyberart",
  description: "Submits Fan Made CyberVision Art For Review To Be Added To Commands ",
  usage: "submitcyberart [Link To Picture (Not File) ]"
}
exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}
