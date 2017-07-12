exports.run = async function (bot, message) {
  let Kayaks = ["https://eddyline.com/wp-content/uploads/2017-C-135-SeaGrass-over-White.jpg", "http://malibuk.malibukayaks.netdna-cdn.com/wp-content/uploads/X-Factor-Blue-Malibu-Kayaks-X-Seat-2017.png", "http://inflatableboats4less.com/wp-content/uploads/2013/04/20120616-dsc_0012-edit.jpg", "https://cdn.hobiecat.com/digital_assets/2016_Mirage-Sport_Studio_3-4_Hibiscus-Red_shadowed.png", "https://thingdoer.com/things-to-do-photos/9/3/935.jpg", "http://www.korculainfo.com/gallery/var/resizes/peljesac/peljesac20.jpeg?m=1358529724", "http://www.pioneerkayak.com/default/anglerkayak.png", "http://i.ebayimg.com/images/i/351838041084-0-1/s-l1000.jpg", "http://www.saturninflatables.net/inflatable-boats-kayaks/inflatable-kayaks/fishing-inflatable-kayaks/inflatable-fishing-kayaks-04.jpg"]
  let Kayak = Kayaks[Math.floor(Math.random() * Kayaks.length)]
  message.channel.send(Kayak)
}

exports.help = {
  name: "kayak",
  description: "KAYAKS",
  usage: "kayak"
} 

exports.config = {
  enabled: true,
  guildOnly: true,
  permlevel: 0, 
  aliases: [] 
}
