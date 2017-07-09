exports.run = async function (bot, message) {
  var randsps = ["https://www.youtube.com/watch?v=rg66j0fUbUk", "https://www.youtube.com/watch?v=LonKGuS9uuQ", "https://www.youtube.com/watch?v=bOR38552MJA", "https://www.youtube.com/watch?v=sNJmfuEWR8w"]
  var rand = randsps[Math.floor(Math.random() * randsps.length)]
  message.channel.send(rand)
}

exports.help = {
  name: "randomsouthparksong",
  description: "Displays A Random SouthPark Song",
  usage: "randomsouthparksong"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: ["randsouthparksong", "randspsong", "randsps", "randomspsong", "randomsps"] 
}
