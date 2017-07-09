exports.run = async function (bot, message) {
  let mention = message.mentions.users.first()
  if(!message.mentions.users.size) return message.reply("you must mention someone!")
  if(message.mentions.users.size > 1) return;
  let role = message.guild.roles.find("name", "Friend of Staff");
  if(!role) return message.channel.send("No `Friend of Staff` role found.")
  if(message.guild.member(mention).roles.has(role.id)) {
    message.reply("this user already has the `Friend of Staff` role. Are you sure to take the role away? (yes, wait 30 seconds for no)").then(() => {
      message.channel.awaitMessages(response => response.content === 'yes' || response.content === "Yes", {
          max: 1,
          time: 30000,
          errors: ['time'],
      }).then((collected) => {
        try {
          message.guild.member(mention).removeRole(role)
          message.channel.send("Removed the role to the user.")
        } catch (err) {
          console.error(err);
        }
      }).catch(() => {
          message.channel.send("command canceled");
      })
  })
} else {
  message.reply("this user doesn't have the `Friend of Staff` role. Are you sure to add the role? (yes, wait 30 seconds for no)").then(() => {
    message.channel.awaitMessages(response => response.content === 'yes' || response.content === "Yes", {
        max: 1,
        time: 30000,
        errors: ['time'],
    }).then((collected) => {
      try {
        message.guild.member(mention).addRole(role)
        message.channel.send("Added the role to the user.")
      } catch (err) {
        console.error(err);
      }
    }).catch(() => {
        message.channel.send("command canceled");
    })
})
}
}

exports.help = {
  name: "fos",
  description: "Gives the mentioned the Friend of Staff role.",
  usage: "fos <@mention>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 4,
  aliases: []
}
