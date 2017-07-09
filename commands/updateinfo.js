exports.run = async function (bot, message) {
  const embed = {
  "title": "Command Update",
  "description": "**Visit:** [Cyber Vision's Website](http://cybervision.ga) For More Info",
  "color": 6624759,
  "footer": {
    "icon_url": "https://yt3.ggpht.com/-9OXsTEyJZl0/AAAAAAAAAAI/AAAAAAAAAAA/o4WiUor95z8/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
    "text": "CyberVision"
  },
  "thumbnail": {
    "url": "https://yt3.ggpht.com/-9OXsTEyJZl0/AAAAAAAAAAI/AAAAAAAAAAA/o4WiUor95z8/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
  },
  "image": {
    "url": "https://yt3.ggpht.com/-9OXsTEyJZl0/AAAAAAAAAAI/AAAAAAAAAAA/o4WiUor95z8/s100-c-k-no-mo-rj-c0xffffff/photo.jpg"
  },
  "author": {
    "name": "Cyber's Secretary",
    "url": "https://discordapp.com",
    "icon_url": "https://yt3.ggpht.com/-9OXsTEyJZl0/AAAAAAAAAAI/AAAAAAAAAAA/o4WiUor95z8/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
  },
  "fields": [
    {
      "name": "Added:",
      "value": "+submitcyberart **Permlvl:** **0** **|** **Usage:** `+submitcyberart [Link (Not File) ]`"
    },
    {
      "name": "Removed:",
      "value": "N/A"
    },
    {
      "name": "Changed:",
      "value": "N/A"
    }
  ]
};
message.guild.channels.find("name", "cybervision-bot-updates").send("**Updates:**", { embed });
}

exports.help = {
  name: "updateinfo",
  description: "Gives Updates For Cyber's Secretary In #cybervision-bot-updates",
  usage: "updateinfo"
}

exports.config = {
  enabled: true, 
  guildOnly: false, 
  permlevel: 20, 
  aliases: [] 
}
