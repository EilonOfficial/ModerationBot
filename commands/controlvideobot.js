const DiscordWebhook = require("discord-webhooks");
exports.run = async function (bot, message) {
  

let myWebhook = new DiscordWebhook("https://discordapp.com/api/webhooks/332964874642522123/kcs6BUeqtvSNXKEAFdceVggjxT0Q9QiiBDKdEcoRkuR70ojuLX9DCozqLPnY-1_SUV60")

myWebhook.on("ready", () => {
    myWebhook.execute({
        content: message.content.split(/[ ]+/).join(" ").substring(16),
        username:"VideoBot",
        avatar_url:"https://cdn1.iconfinder.com/data/icons/logotypes/32/youtube-512.png"
    });
});

myWebhook.on("error", (error) => {
  console.warn(error);
});
}

exports.help = {
  name: "controlvideobot",
  description: "controls the video bot",
  usage: "controlvideobot"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
