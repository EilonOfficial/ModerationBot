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

            if(message.content.includes("https://discord.gg/") || message.content.includes("discord.gg/") || message.content.includes("https://www.youtube.com/channels") || message.content.includes("www.youtube.com/channel") || message.content.includes("https://youtube.com/channels") || message.content.includes("https://youtube.com/users/") || message.content.includes("youtube.com/channel/") || message.content.includes("youtube.com/users/")){
    if(message.content.includes("youtube")) var Link = "Youtube Channel Link"
    else if(message.content.includes("discord")) var Link = "Discord Invite Link"
  var embed = new Discord.RichEmbed()
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
      }
    }
}); // Command handler.

bot.on("guildMemberAdd", (member) => {
  let role = member.guild.roles.find("name", "Member")
  member.addRole(role)
});

bot.login(config.token) // Logins to your bot account with the set token in the config file.