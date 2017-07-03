const Discord = require('discord.js');
const client = new Discord.Client
const newUsers = new Discord.Collection();
client.on('ready', () => { client.user.setGame('With Scammers') })
var Memes = ["memes/meme1.gif","memes/meme3.gif","memes/meme4.jpg","memes/meme5.gif"];
var Decider = ["Yes", "No"];
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

client.on("guildMemberRemove", (member) => {
  console.log(`New User "${member.user.username}" has joined ${member.guild.name}` );
  member.guild.defaultChannel.send(`Welcome To The CyberVision Discord, @${member.user.username}#${member.user.discriminator}, Please Make Sure You Read Over The Guidelines Correctly, And Most Importantly, HAVE FUN!`);
});

client.on("guildMemberRemove", (member) => {
  if(newUsers.has(member.id)) newUsers.delete(member.id);
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
          if(message.content.includes('kayak') || message.content.includes('Kayak') || message.content.includes('kayaking') || message.content.includes('Kayaking')){
              if(message.content.includes('f') || message.content.includes('u') || message.content.includes('you') || message.content.includes('U') || message.content.includes('You')){
                message.reply('YASSSSSSSS')
              }
            } else {
                if(message.content.includes('Cyber') || message.content.includes('Vision') || message.content.includes('Joel') || message.content.includes('Eilon')){
                    if(message.content.includes('cool') || message.content.includes('Cool')){
                    message.reply('YES. WHAT KIND OF QUESTION IS THAT?')
                } else {
                    if(message.content.includes('Motasim') || message.content.includes('Eilon') || message.content.includes('motasim') || message.content.includes('eilon')){
                        if(message.content.includes('And') || message.content.includes('Develop') || message.content.includes('Make') || message.content.includes('Build') || message.content.includes('and') || message.content.includes('make') || message.content.includes('develop') || message.content.includes('build')){
                            message.reply('OF COURSE!')
                        }
                    } else {
                        var rand = Decider[Math.floor(Math.random() * 2)];
                message.reply(rand)
                    }
                    }
                } else {
                      var rand = Decider[Math.floor(Math.random() * 2)];
                message.reply(rand)
                }
             } 
      }
}

if(commandIs('help', message)){
    if(args.length === 1){
 var embed = {
  "title": "Command Help:",
  "description": "**Current Commands:**",
  "color": 45674,
  "timestamp": "2017-07-02T03:36:55.079Z",
  "footer": {
    "icon_url": "https://yt3.ggpht.com/-9OXsTEyJZl0/AAAAAAAAAAI/AAAAAAAAAAA/o4WiUor95z8/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
    "text": "Command Help"
  },
  "thumbnail": {
    "url": "https://yt3.ggpht.com/-9OXsTEyJZl0/AAAAAAAAAAI/AAAAAAAAAAA/o4WiUor95z8/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
  },
  "author": {
    "name": "Cybers Secretary",
    "url": "http://cybervision.ga",
    "icon_url": "https://yt3.ggpht.com/-9OXsTEyJZl0/AAAAAAAAAAI/AAAAAAAAAAA/o4WiUor95z8/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
  },
  "fields": [
    {
      "name": "**+cyberart**",
      "value": "**Usage:** `+cyberart`"
    },
    {
      "name": "**+cyberdecider**",
      "value": "**Usage:** `+cyberdecider [Question]`"
    },
    {
      "name": "**+permban**",
      "value": "**Usage:** `+permban [User To Ban]`"
    },
    {
      "name": "**+kick**",
      "value": "**Usage:** `+kick [User To kick]`"
    },
    {
      "name": "**+purge**",
      "value": "**Usage** `+purge [Number Of Messages To Delete]`"
    }
  ]
};
message.author.send("**Commands:**", { embed });
    }
}

if(commandIs('help kick', message)){
    message.channel.send('**Usage:** `+kick [User To Kick]`')
} else {
    if(commandIs('help permban', message)){
        message.channel.send('**Usage:** `+permban [User To Ban]`')
    } else {
        if(commandIs('help purge', message)){
            message.channel.send('**Usage:** `+purge [Number Of Messages To Delete]`')
        } else {
            if(commandIs('help cyberart', message)){
                message.channel.send('**Usage:** `+cyberart`')
            } else {
                if(commandIs('help cyberdecider', message)){
                    message.channel.send('**Usage:** `+cyberdecider [Question]`')
                }
            }
        }
    }
}



});
client.login('SUCKMYDICK')

