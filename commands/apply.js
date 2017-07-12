const Discord = require("discord.js")
const embedcolors = require("../embedcolors.json")
exports.run = async function (bot, message) {
  message.channel.send('Are You Sure You Would Like To Create A Staff Application? (Yes/No)').then(() => {
      message.channel.awaitMessages(response => response.author === message.author, {
          max : 1,
          time : 10000
      }).then(() => {
          if(message.author.lastMessage.content === "Yes" || message.author.lastMessage.content === "yes"){
            message.channel.send('What Is Your Age?').then(() => {
                message.channel.awaitMessages(response => response.author === message.author, {
                    max : 1,
                    time : 10000,
                }).then(() => {
                    var Age = message.author.lastMessage.content
                    message.channel.send(`Ok, Marked Age As ${Age}.`).then(() => {
                        message.channel.send('What Is Your TimeZone?').then(() => {
                            message.channel.awaitMessages(response => response.author === message.author, {
                                max : 1,
                                time : 30000,
                            }).then(() => {
                                var TimeZone = message.author.lastMessage.content
                                message.channel.send(`Ok, Marked TimeZone As ${TimeZone}.`).then(() => {
                                    message.channel.send('What Experience Do You Have Moderating?').then(() => {
                                        message.channel.awaitMessages(response => response.author === message.author, {
                                            max : 1,
                                            time : 180000
                                        }).then(() => {
                                            var Experience = message.author.lastMessage.content
                                            message.channel.send(`Ok, Marked Expireence As "${Experience}"`).then(() => {
                                                message.channel.send('Why Should We Hire You Rather Than Other Applicants?').then(() => {
                                                    message.channel.awaitMessages(response => response.author === message.author, {
                                                        max : 1,
                                                        time : 180000,
                                                    }).then(() => {

                                                    }).then(() => {
                                                       var Why = message.author.lastMessage.content
                                                        message.channel.send(`Ok, Marked Reason As "${Why}".`)
                                                        message.channel.send("Have You Previously Been Staff On CyberVision's Server?").then(() => {
                                                            message.channel.awaitMessages(response => response.author === message.author, {
                                                                max : 1,
                                                                time : 10000,
                                                            }).then(() => {
                                                                var PreviouslyStaff = message.author.lastMessage.content
                                                                message.channel.send(`Ok, Marked Previously Staff As ${PreviouslyStaff}.`).then(() => {
                                                                    message.channel.send("Have You Ever Been Striked/Striken On CyberVision's Server?").then(() => {
                                                                        message.channel.awaitMessages(response => response.author === message.author, {
                                                                            max : 1,
                                                                            time : 60000,
                                                                        }).then(() => {
                                                                            var Striken = message.author.lastMessage.content
                                                                            message.channel.send(`Ok, Marked Striken/Striked As ${Striken}`).then(() => {
                                                                                message.channel.send("Would You like To Submit This Application? (Yes/No)").then(() => {
                                                                                    message.channel.awaitMessages(response => response.author === message.author, {
                                                                                        max : 1,
                                                                                        time : 40000,
                                                                                    }).then(() => {
                                                                                        if(message.author.lastMessage.content === "Yes" || message.author.lastMessage.content === "yes"){
                                                                                            const embed = new Discord.RichEmbed()
                                                                                            .setTitle("Staff Application")
                                                                                            .setColor(embedcolors.green_positive)
                                                                                            .setThumbnail(message.author.avatarURL)
                                                                                            .setFooter("Staff Application")
                                                                                            .setTimestamp(message.author.lastMessage.createdAt)
                                                                                            .addField("Username:", message.author)
                                                                                            .addField("Tag:", message.author.tag)
                                                                                            .addField("UserID", message.author.id)
                                                                                            .addField("Age:", Age)
                                                                                            .addField("TimeZone:", TimeZone)
                                                                                            .addField("Experience", Experience)
                                                                                            .addField("Why Should We Hire You Rather Than Other Applicants:", Why)
                                                                                            .addField("Have You Previously Been Staff On CyberVision's Server?", PreviouslyStaff)
                                                                                            .addField("Have You Ever Been Striked On CyberVision's Server?", Striken)
                                                                                            message.author.send({embed})
                                                                                            message.guild.channels.find("name", "applications").send({embed})
                                                                                        } else {
                                                                                            if(message.author.lastMessage.content === "No" || message.author.lastMessage.content === "no") message.channel.send('Ok, Application Cancelled')
                                                                                        }
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
          }
          if(message.author.lastMessage.content === "No" || message.author.lastMessage.content === "no") message.channel.send('Ok, Application Cleared')
      })
  })
}

exports.help = {
  name: "apply",
  description: "Creates A Staff Aplication",
  usage: "apply"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
