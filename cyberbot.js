const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

var no_perms = config.no_perms; // Message to send when someone doesn't have the permissions to run the command.

bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

bot.elevation = message => {
  var permlevel = 0;
  if(!message.guild) return;
  if(message.member.roles.has(config.mod_role_name.id)) permlevel = 2;
  if(message.member.roles.has(config.admin_role_name.id)) permlevel = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlevel = 6;
  if(message.author.id === message.guild.owner.id) permlevel = 8
  if(config.developers.includes(message.author.id)) permlevel = 10;
  if(config.owners.includes(message.author.id)) permlevel = 20;
  if(message.author.id === config.creator) permlevel = 999999999999999999;
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
        console.log(`The command ${command} was runned by ${message.author.tag}`);
      }
    }
}); // Command handler.

bot.login(config.token) // Logins to your bot account with the setted token in the config file.
