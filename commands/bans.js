const bans = require("../data/bans.json");
const Discord = require("discord.js");
const fs = require("fs")
exports.run = async function (bot, message, args) {
      let userid = args.slice(0).join(" ")
      if(!userid) {
        let list = Object.keys(bans);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (bans[list[i]].user.id === message.author.id && bans[list[i]].server.id === message.guild.id) {
                foundCounter++;
                found += `Case ID: ${(bans[list[i]].ban.caseid)}\nUsername: ${bans[list[i]].user.name}#${bans[list[i]].user.discrim}\nAdmin: ${bans[list[i]].admin.name}#${bans[list[i]].admin.discrim}\nServer: ${bans[list[i]].server.name}\nReason: ${bans[list[i]].reason}\n\n`;
            }
        }
        if (foundCounter == 0) return message.channel.send("No bans found for that user")
        message.channel.send("Found " + foundCounter + " ban(s).\n```" + found + "```");
      }
      if(!message.guild.members.has(userid)) return;
      let list = Object.keys(bans);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (bans[list[i]].user.id === userid && bans[list[i]].server.id === message.guild.id) {
              foundCounter++;
              found += `Case ID: ${(bans[list[i]].ban.caseid)}\nUsername: ${bans[list[i]].user.name}#${bans[list[i]].user.discrim}\nAdmin: ${bans[list[i]].admin.name}#${bans[list[i]].admin.discrim}\nServer: ${bans[list[i]].server.name}\nReason: ${bans[list[i]].reason}\n\n`;
          }
      }
      if (foundCounter == 0) return message.channel.send("No bans found for that user")
      message.channel.send("Found " + foundCounter + " ban(s).\n```" + found + "```");
}

exports.help = {
  name: "bans",
  description: "Shows the total bans for a user.",
  usage: "bans @mention / bans <user ID>"
}

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0,
  aliases: []
}
