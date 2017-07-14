const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const embedcolors = require("./embedcolors.json")
var no_perms = config.no_perms; // Message to send when someone doesn't have the permissions to run the command.

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

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


bot.elevation = message => {
  var permlevel = 0;
  if(!message.guild) return;
  if(hasRole(message.member, "Helper")) permlevel = 2;
  if(hasRole(message.member, "Moderator")) permlevel = 4;
  if(hasRole(message.member, "Administrators")) permlevel = 6;
  if(hasRole(message.member, "Owner")) permlevel = 8;
  if(message.member.hasPermission("ADMINISTRATOR")) permlevel = 6;
  if(message.author.id === message.guild.owner.id) permlevel = 8;
  if(config.developers.includes(message.author.id)) permlevel = 12;
  if(config.owners.includes(message.author.id)) permlevel = 20;
  if(message.author.id === config.creator) permlevel = 100000000;
  return permlevel;
}; // The permission level we are going to use for the commands.


bot.on("ready", () => {
  fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);
    console.log(`Loading a total of ${files.length} commands!`);
    files.forEach(filename => {
      let props = require(`./commands/${filename}`);
      bot.commands.set(props.help.name, props);
      props.config.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name);
      });
    });
  });
  console.log("Online and ready!")
  console.log(`Serving a total of ${bot.guilds.size} servers and ${bot.users.size} users.`)
}); // Ready event: when the bot gets online.


bot.on("message", message => {
  let prefix;
  if(message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
  let command = message.content.toLowerCase().split(' ')[0].slice(config.prefix.length);
  let perms = bot.elevation(message);
  let args = message.content.split(' ').slice(1);
  let cmd;

  if (bot.commands.has(command)) {
  cmd = bot.commands.get(command);
  } else if (bot.aliases.has(command)) {
  cmd = bot.commands.get(bot.aliases.get(command));
  }
  if(!cmd) return;
    if (cmd) {
      if (perms < cmd.config.permlevel) {
        if(!message.guild && perms < cmd.config.permlevel) return message.channel.send(no_perms)
        message.author.send(no_perms)
      } else {
        if(cmd.config.enabled === false) return message.channel.send("```" + `The command ${command} is disabled by the developers.` + "```")
        if(cmd.config.guildOnly === true && !message.guild) return message.channel.send("```Error: This command is only available in a server.```")
        cmd.run(bot, message, args, perms);
        console.log(`The command ${command} was ran by ${message.author.tag}`);
      }
    }
}); // Command handler.

bot.on("message", message => {
            if(message.content.includes("https://discord.gg/") || message.content.includes("discord.gg/") || message.content.includes("https://www.youtube.com/channels") || message.content.includes("www.youtube.com/channel") || message.content.includes("https://youtube.com/channels") || message.content.includes("https://youtube.com/users/") || message.content.includes("youtube.com/channel/") || message.content.includes("youtube.com/users/")){
    if(message.content.includes("youtube")) var Link = "Youtube Channel Link"
    else if(message.content.includes("discord")) var Link = "Discord Invite Link"
  const embed = new Discord.RichEmbed()
  .setTitle(`${Link} **Deleted:**`)
  .setFooter("Message Deleted")
  .setTimestamp(message.author.lastMessage.createdAt)
  .setColor(embedcolors.green_positive)
  .setThumbnail("http://www.drodd.com/images14/x19.jpg")
  .addField("Message Author:", message.author)
  .addField("Authors Tag:", message.author.tag)
  .addField("Username:", message.author.username)
  .addField("User ID:", message.author.id)
  .addField("Deleted Message ID:", message.author.lastMessageID)
  .addField("Message Created At:", message.author.lastMessage.createdAt)
  .addField("Message Deleted At:", message.author.lastMessage.createdAt)
  message.guild.channels.find("name", "logs").send({embed})
  console.log("Advertisement Detected.")
  message.author.lastMessage.delete(1)
  }
}); //Filter Handler


const yt = require('ytdl-core');
const tokens = require('./tokens.json');

let queue = {};

const commands = {
	'play': (msg) => {
    if(hasRole(msg.member, "DJ")){
		if (queue[msg.guild.id] === undefined) {
		if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
    if (queue[msg.guild.id].playing) return msg.channel.sendMessage('Already Playing');
    }
		if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
    if (queue[msg.guild.id].playing) return msg.channel.sendMessage('**Already Playing**');
		let dispatcher;
		queue[msg.guild.id].playing = true;
		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return msg.channel.sendMessage('Queue is empty').then(() => {
				queue[msg.guild.id].playing = false;
				msg.member.voiceChannel.leave();
			});
      const embed = new Discord.RichEmbed()
      .setTitle("Playing:")
      .setColor(embedcolors.green_positive)
      .setThumbnail(bot.user.avatarURL)
      .setFooter("Music Bot")
      .setTimestamp(msg.createdAt)
      .addField("Current Song:", `Playing **${song.title}** as requested by: **${song.requester}**`)
      msg.channel.send({embed})
			dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : tokens.passes });
      let collector = msg.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(tokens.prefix + 'pause')) {
          if(hasRole(msg.member, "DJ")){
          msg.channel.sendMessage('paused').then(() => {dispatcher.pause();});
          } else {
            msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
          }
				} else if (m.content.startsWith(tokens.prefix + 'resume')){
          if(hasRole(msg.member, "DJ")){
          msg.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
          } else {
            msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
          }
				} else if (m.content.startsWith(tokens.prefix + 'skip')){
          if(hasRole(msg.member, "DJ")){
          msg.channel.sendMessage('skipped').then(() => {dispatcher.end();});
          } else msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
				} else if (m.content.startsWith('volume+')){
          if(hasRole(msg.member, "DJ")){
          if (Math.round(dispatcher.volume*50) >= 100) return msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.min((dispatcher.volume*50 + (2*(m.content.split('+').length-1)))/50,2));
          msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          } else msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
				} else if (m.content.startsWith('volume-')){
          if(hasRole(msg.member, "DJ")){
					if (Math.round(dispatcher.volume*50) <= 0) return msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
					dispatcher.setVolume(Math.max((dispatcher.volume*50 - (2*(m.content.split('-').length-1)))/50,0));
          msg.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          } else msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
				} else if (m.content.startsWith(tokens.prefix + 'time')){
					msg.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[msg.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return msg.channel.sendMessage('error: ' + err).then(() => {
					collector.stop();
					play(queue[msg.guild.id].songs.shift());
				});
			});
    })(queue[msg.guild.id].songs.shift());
    } else msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
	},
	'join': (msg) => {
		return new Promise((resolve, reject) => {
      if(hasRole(msg.member, "DJ")){
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel...');
      voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
      } else msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
		});
	},
	'addqueue': (msg) => {
    const args = msg.content.split(/[ ]+/)
    if(args.length === 2){
    let url = msg.content.split(' ')[1];
		if (url == '' || url === undefined) return msg.channel.sendMessage(`You must add a YouTube video url, or id after ${tokens.prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return msg.channel.sendMessage('Invalid YouTube Link: ' + err);
			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
      const embed = new Discord.RichEmbed()
      .setTitle("Song Added")
      .setColor(embedcolors.green_positive)
      .setThumbnail(bot.user.avatarURL)
      .setFooter("Starting Queue")
      .setTimestamp(msg.createdAt)
      .addField("Song:", `**${info.title}**`)
      msg.channel.send({embed})
    });
    } else {
      msg.channel.send('Please Provide A Link.')
    }
	},
	'queue': (msg) => {
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`Add some songs to the queue first with \`${tokens.prefix}queueadd [Youtube Link]\``);
		let tosend = [];
    queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song.title} - Requested by: ${song.requester}`);});
    if(tosend.length === 0){
      msg.channel.send('**0** Songs Queued')
    } else {
		msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
    }
  },
	'stop': (msg) => {
    if(hasRole(msg.member, "DJ")){
    const voiceChannel = msg.member.voiceChannel;
    voiceChannel.leave();
    } else msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
  },
  'leave' : (msg) => {
    if(msg.member, "DJ"){
    const voiceChannel = msg.member.voiceChannel;
    voiceChannel.leave();
    } else msg.channel.send(config.no_perms).then(() => {msg.author.send(config.no_perms)})
  }
};

bot.on('ready', () => {
	console.log('ready!');
});

bot.on('message', msg => {
	if (!msg.content.startsWith(tokens.prefix)) return;
	if (commands.hasOwnProperty(msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0])) commands[msg.content.toLowerCase().slice(tokens.prefix.length).split(' ')[0]](msg);
});


bot.on("guildMemberAdd", (member) => {
  let role = member.guild.roles.find("name", "Member")
  member.addRole(role)
  member.send(`Welcome To ${member.guild}'s Server Please Read Over The Guidelines And Have A Nice Time! Once You Have Read Over The Guidelines Type "${config.prefix}agree" In #guests, if you do not see a channel called #guests, that means that Anti-Raid Is Disabled. In That Case Do Not Worry About ${config.prefix}agree`)
  member.guild.channels.find("name", config.MainChat).send(`${member} Thank you for choosing ${member.guild}! Hope you have a good time! And if you havent already, please read over our rules in #guidelines`)
});

bot.login(config.token) // Logins to your bot account with the set token in the config file.