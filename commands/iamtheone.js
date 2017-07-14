const ytdl = require("ytdl-core")
exports.run = async function (bot, message) {
      const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`Please be in a voice channel first!`);
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=CV0mqlzDOuU", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
      });
}

exports.help = {
  name: "iamtheone",
  description: "Pretty Self Explanitory.",
  usage: "iamtheone"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 6, 
  aliases: [] 
}
