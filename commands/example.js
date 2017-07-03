exports.run = async function (bot, message) {
  console.log(`${message.author.tag} runned the example command which basically does nothing.`);
}

exports.help = {
  name: "<command name>",
  description: "<what the command does>",
  usage: "<how to use the command>"
} // This all gets showed in the help.

exports.config = {
  enabled: false, // Enabled: true, otherwise, false
  guildOnly: false, // Only available in a server: true, otherwise, false
  permlevel: 0, // Required permission level to use this command.
  aliases: [] // Just keep it like this.
}
