const Discord = require('discord.js');
const client = new Discord.Client
const newUsers = new Discord.Collection();
client.on('ready', () => { client.user.setGame('With Scammers') })
var Memes = ["memes/meme1.gif","memes/meme3.gif","memes/meme4.jpg","memes/meme5.gif"];
var Scams = ["syskey","SAM LOCK ROOL","ReimagePlus","eventvwr","dir /s","tree","hh h","hh microsoft","support.me","fastsupport.com","Go To Assist","Ammy Admin"];
var Dice = ["<:diceface1:330090887273119745>","<:diceface2:330091146027991041>","<:diceface3:330091339825807363>","<:diceface4:330091474295455774>","<:diceface5:330091570000822284>","<:diceface6:330091695674753025>"];
var Decider = ["Yes","No"];
function pluck(array) {
    return array.map(function(item){ return item["name"];})
}
function hasRole(mem, role){
    if(pluck(mem.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}


function commandIs(str, msg){
    return msg.content.startsWith("+" + str);
}

client.on("guildMemberAdd", (member) => {
  console.log(`New User "${member.user.username}" has joined ${member.guild.name}` );
  member.guild.defaultChannel.send(`Welcome To The CyberVision Discord, @${member.user.username}#${member.user.discriminator}, Please Make Sure You Read Over The Guidelines Correctly, And Most Importantly, HAVE FUN!`);
});

client.on('ready', () => {
    console.log('The Bot Is Online!')
});
client.on('message', message => {
var args = message.content.split(/[ ]+/);
if(commandIs('cyberart', message)){
    var rand = Memes[Math.floor(Math.random() * Memes.length)];
    message.channel.sendFile(rand);
}
if(commandIs('purge', message)){
    if(hasRole(message.member, "Owner") || hasRole(message.member, "Administrator") || hasRole(message.member, "Moderator") || hasRole(message.member, "MOD") || hasRole(message.member,"MODERATOR") || hasRole(message.member,"Admin") || hasRole(message.member,"mod") || hasRole(message.member,"ADMIN") || hasRole(message.member,"admin")){
            if(args.length >= 3){
        message.channel.sendMessage('`Please Provide Valid Arguements.`');
    } else {
        var msg;
        if(args.length === 1){
            msg=2;
        } else {
            msg=parseInt(args[1]) + 1;
        }
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
    } 
    } else {
        message.channel.sendMessage('`Sorry, you do not have the valid permision to execute this command.`')
    }
}

if(commandIs('kick', message)){
  if(hasRole(message.member, "Owner") || hasRole(message.member, "Administrator") || hasRole(message.member, "Moderator") || hasRole(message.member, "BOTS") || hasRole(message.member,"MODERATOR") || hasRole(message.member,"Admin") || hasRole(message.member,"mod") || hasRole(message.member,"ADMIN") || hasRole(message.member,"admin")){
    if(args.length === 1){
        message.channel.sendMessage('You did not define an argument. Usage: `+kick [user to kick] | [reason]`');
    } else {
        message.guild.member(message.mentions.users.first()).kick();
        }
    }
}

if(commandIs('permban', message)){
  if(hasRole(message.member, "Owner") || hasRole(message.member, "Administrator") || hasRole(message.member, "Moderator") || hasRole(message.member, "BOTS") || hasRole(message.member,"MODERATOR") || hasRole(message.member,"Admin") || hasRole(message.member,"mod") || hasRole(message.member,"ADMIN") || hasRole(message.member,"admin")){
    if(args.length === 1){
        message.channel.sendMessage('`You did not define an argument. Usage: `+permban [user to ban] | [reason]`');
    } else {
        message.guild.member(message.mentions.users.first()).ban();
        }
    }
}

if(commandIs('cyberdecider', message)){
      if(args.length === 1){
        message.channel.sendMessage('You did not define an argument. Usage: `+cyberdecider [Question]`');
      } else {
          var rand = Decider[Math.floor(Math.random() * 2)];
          message.reply(rand)
      }
}

});
client.login('MzMwMTc5MzgwNjY2MDQwMzIw.DDg7-Q.LCeJ3WPDpVW6s_O1T0y1oo1mb3k')

