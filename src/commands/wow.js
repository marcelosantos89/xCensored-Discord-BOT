const https = require('https');
const xml2js = require('xml2js');
const request = require('request');
const Discord = require('discord.js');

module.exports = {
  name: 'wow',
  description: 'Display latest news from MMO Champion',
  execute(message) {
    const results = [];
    var parser = new xml2js.Parser();
    https.get('https://www.mmo-champion.com/external.php?do=rss&type=newcontent&sectionid=1&days=120&count=1', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        parser.parseString(data, function (err, result) {
          let content = result.rss.channel[0].item[0];

          var stripedHtml = content.description[0].split('<br />')
          stripedHtml = stripedHtml[1].replace(/<[^>]+>/g, '')
          
          const exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('MMO Champion Latest News' + ' - ' + content.title[0])
          .setURL(content.link[0])
          .setDescription(stripedHtml)
          .setThumbnail('https://static.mmo-champion.com/images/tranquilizing/logo.png')
          .setTimestamp(content.pubDate[0])
          message.channel.send(exampleEmbed);
      });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });

  },
};