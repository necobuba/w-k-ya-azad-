const DiscordAzadi = require("discord.js");
const botAzadi = new DiscordAzadi.Client();
const superagentAzadi = require("superagent");
const snekfetchAzadi = require("snekfetch");
exports.run = async (client, message, args) => {
  const query = args.join(" ");
  const { body } = await snekfetchAzadi
    .get("https://ku.wikipedia.org/w/api.php")
    .query({
      action: "query",
      prop: "extracts",
      format: "json",
      titles: query,
      exintro: "",
      explaintext: "",
      redirects: "",
      formatversion: 2
    });
  if (body.query.pages[0].missing) return message.channel.send("Agahî Tînê");
  const embed = new DiscordAzadi.MessageEmbed()
    .setColor(0x00a2e8)
    .setTitle(body.query.pages[0].title)
    .setDescription(
      body.query.pages[0].extract.substr(0, 2000).replace(/[\n]/g, "\n\n")
    );
  return message.channel.send(embed).catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["Wîkipediya", "wîki"],
  permLevel: 0
};

exports.help = {
  name: "Wîkipediya",
  description: "wê bejî wîkipedîya agahî",
  usage: "wikipedia agahî"
};