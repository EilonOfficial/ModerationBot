const Discord = require('discord.js');
const embedcolors = require('../embedcolors.json');
const strikes = require("../data/strikes.json");
const kicks = require("../data/kicks.json");
const bans = require("../data/bans.json");
exports.run = async function (bot, message) {
function getstrikes(){
                 let userid = message.author.id
      if(!userid) {
        let list = Object.keys(strikes);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (strikes[list[i]].user.id === message.author.id && strikes[list[i]].server.id === message.guild.id) {
                foundCounter++;
                found += `Case ID: ${(strikes[list[i]].kick.caseid)}\nUsername: ${strikes[list[i]].user.name}#${strikes[list[i]].user.discrim}\nAdmin: ${strikes[list[i]].admin.name}#${strikes[list[i]].admin.discrim}\nServer: ${strikes[list[i]].server.name}\nReason: ${strikes[list[i]].reason}\n\n`;
            }
        }
        findstrikes = ("Found " + foundCounter + " strike(s).\n```" + found + "```")
        if (foundCounter == 0) findstrikes = ("No strikes found for that user")
      }
      if(!message.guild.members.has(userid)) return;
      let list = Object.keys(strikes);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (strikes[list[i]].user.id === userid && strikes[list[i]].server.id === message.guild.id) {
              foundCounter++;
              found += `Case ID: ${(strikes[list[i]].kick.caseid)}\nUsername: ${strikes[list[i]].user.name}#${strikes[list[i]].user.discrim}\nAdmin: ${strikes[list[i]].admin.name}#${strikes[list[i]].admin.discrim}\nServer: ${strikes[list[i]].server.name}\nReason: ${strikes[list[i]].reason}\n\n`;
          }
      }
      findstrikes = ("Found " + foundCounter + " strike(s).\n```" + found + "```");
      if (foundCounter == 0) findstrikes = ("No strikes found for that user")
}
 function FindKicks(){
       let userid = message.author.id
      if(!userid) {
        let list = Object.keys(kicks);
        let found = '';
        let foundCounter = 0;
        let warnCase;
        //looking for the case id
        for (let i = 0; i < list.length; i++) {
            if (kicks[list[i]].user.id === message.author.id && kicks[list[i]].server.id === message.guild.id) {
                foundCounter++;
                found += `Case ID: ${(kicks[list[i]].kick.caseid)}\nUsername: ${kicks[list[i]].user.name}#${kicks[list[i]].user.discrim}\nAdmin: ${kicks[list[i]].admin.name}#${kicks[list[i]].admin.discrim}\nServer: ${kicks[list[i]].server.name}\nReason: ${kicks[list[i]].reason}\n\n`;
            }
        }
        getkicks = ("Found " + foundCounter + " kick(s).\n```" + found + "```");
        if (foundCounter == 0) getkicks = ("No kicks found for that user")
      }
      if(!message.guild.members.has(userid)) return;
      let list = Object.keys(kicks);
      let found = '';
      let foundCounter = 0;
      let warnCase;
      //looking for the case id
      for (let i = 0; i < list.length; i++) {
          if (kicks[list[i]].user.id === userid && kicks[list[i]].server.id === message.guild.id) {
              foundCounter++;
              found += `Case ID: ${(kicks[list[i]].kick.caseid)}\nUsername: ${kicks[list[i]].user.name}#${kicks[list[i]].user.discrim}\nAdmin: ${kicks[list[i]].admin.name}#${kicks[list[i]].admin.discrim}\nServer: ${kicks[list[i]].server.name}\nReason: ${kicks[list[i]].reason}\n\n`;
          }
      }
      getkicks = "Found " + foundCounter + " kick(s).\n```" + found + "```"
      if (foundCounter == 0) getkicks = ("No kicks found for that user")
  }
    function FindBans(){
            let userid = message.author.id
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
        getbans = ("Found " + foundCounter + " ban(s).\n```" + found + "```");
        if (foundCounter == 0) getbans = ("No bans found for that user")
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
      getbans = "Found " + foundCounter + " ban(s).\n```" + found + "```"
      if (foundCounter == 0) getbans = ("No bans found for that user")
}
getstrikes()
FindKicks()
FindBans()
    const embed = new Discord.RichEmbed()
    .setTitle("Punishment Appeal")
    .setColor(embedcolors.green_positive)
    .setThumbnail(bot.avatarURL)
    .setDescription("Please [Fill Out The Appeal Form](https://goo.gl/forms/GiJdwPy58DTryI282) At https://goo.gl/forms/GiJdwPy58DTryI282")
    .setFooter("Punishment Appeal")
    .setTimestamp(message.author.lastMessage.createdAt)
    .addField("Strikes:", findstrikes)
    .addField("Kicks:", getkicks)
    .addField("Bans:", getbans)
    message.author.send({embed})
}

exports.help = {
  name: "appeal",
  description: "Gives The User A Punishment Appeal Link",
  usage: "appeal"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
