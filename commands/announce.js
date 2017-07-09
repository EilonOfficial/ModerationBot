exports.run = async function (bot, message) {
    const Discord = require("discord.js")
    const embedcolors = require("../embedcolors.json")
    const args = message.content.split(/[ ]+/)
    if(args.length === 0){
        message.channel.send('You Did Not Define An Argument. **Usage:** `+announce announcement`')
    } else {
        const embed = new Discord.RichEmbed()
        .setColor(embedcolors.green_positive)
        .setTimestamp(message.createdAt)
        .setFooter("Announcement As Of")
        .setAuthor(message.author.tag + " Made An Announcement:")
        .setThumbnail("https://cdn.pixabay.com/photo/2013/07/13/09/36/megaphone-155780_960_720.png")
        .addField("Message:", args.join(" ").substring(9))
        message.guild.channels.find("name", "announcements").send('@everyone')
        message.guild.channels.find("name", "announcements").send({embed})
    }
}

exports.help = {
  name: "announce",
  description: "This Command Will Make Announcements.",
  usage: "announce [Announcement]"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 8, 
  aliases: [] 
}
