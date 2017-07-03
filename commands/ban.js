const Discord = require("discord.js");
const bans = require("../data/bans.json");
const embedcolors = require("../embedcolors.json");
const fs = require("fs");
exports.run = async function (bot, message, args) {
  if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) return message.reply("I do not have the correct permissions to do this.")
  let mention = message.mentions.users.first()
  let reason = args.slice(1).join(" ")
  let log_channel = message.guild.channels.find("name", "mod-logs");
  if(!log_channel) {
    if(!message.guild.member(bot.user).hasPermission("MANAGE_CHANNELS")) return message.reply("there is not a `mod-logs` channel.")
    message.guild.createChannel({name: "mod-logs", type: "text"})
  }
  if(!message.mentions.users.size) return message.reply("you must mention someone to ban.")
  if(!message.guild.member(mention).bannable) return message.reply("I cannot ban that member.")
  if(message.mentions.users.size > 1) return message.reply("you can only ban one person at a time.")
  if(reason.length < 1) return message.reply("you must provide a reason for this ban.")
  let caseid = genToken(20)


    function genToken(length) {
        let key = ""
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i = 0; i < length; i++) {
            key += possible.charAt(Math.floor(Math.random() * possible.length))
        }

        return key
    }
  const dcembed = new Discord.RichEmbed()
  .setTitle("Ban")
  .setColor(embedcolors.red)
  .setDescription(`${mention} just got banned from the server.`)
  .addField("User:", mention.tag)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", reason)
  message.guild.defaultChannel.send({embed: dcembed})
  const lcembed = new Discord.RichEmbed()
  .setTitle("Ban")
  .setColor(embedcolors.red)
  .addField("User:", mention.tag)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", reason)
  bot.channels.get(log_channel.id).send({embed: lcembed})
  const urembed = new Discord.RichEmbed()
  .setTitle("Ban")
  .setColor(embedcolors.red)
  .addField("Moderator:", message.author.tag)
  .addField("Reason:", reason)
  message.guild.member(mention).send({embed: urembed})
  message.guild.member(mention).ban(7)
  message.channel.send("User successfully banned.")
  bans[caseid] = {
  "ban" : {
    "caseid" : caseid
  },
    "admin": {
        "name": message.author.username,
        "discrim": message.author.discriminator,
        "id": message.author.id
    },
    "user": {
        "name": mention.username,
        "discrim": mention.discriminator,
        "id": mention.id
    },
    "server": {
        "name": message.guild.name,
        "id": message.guild.id,
        "channel": message.channel.name,
        "channel_id": message.channel.id
    },
    "reason": reason
}
fs.writeFile("./data/bans.json", JSON.stringify(bans))
}

exports.help = {
  name: "ban",
  description: "Bans the mentioned user.",
  usage: "ban <@user#0000> <reason>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 2,
  aliases: []
}
