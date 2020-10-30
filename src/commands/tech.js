const https = require('https');
const xml2js = require('xml2js');
const request = require('request');
const Discord = require('discord.js');

module.exports = {
  name: 'tech',
  description: 'Display latest news from Technology',
  execute(message) {
    const results = [];
    var parser = new xml2js.Parser();
    https.get('https://www.tomshardware.com/feeds/all', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        parser.parseString(data, function (err, result) {
          let content = result.rss.channel[0].item[0];
          
          const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Toms Hardware Latest News' + ' - ' + content.title[0])
            .setURL(content.link[0])
            .setDescription(content.description[0])
            .setThumbnail('https://edgeup.asus.com/wp-content/uploads/2015/03/Toms-Hardware-Logo.png')
            .setTimestamp(content.pubDate[0])
          
          message.channel.send(exampleEmbed);
        });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  },
};