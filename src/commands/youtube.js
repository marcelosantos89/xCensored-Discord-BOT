const Youtube = require("youtube-api")
require('dotenv').config()

module.exports = {
	name: 'youtube',
  description: 'Get Youtube Video',
  args: true,
  usage: '<video>',
	execute(message, args) {
    var params = args.toString().replace(/,/g, ' ')
    
    Youtube.authenticate({type: "key",key: process.env.YOUTUBE_TOKEN})
    Youtube.search.list({
      q: encodeURIComponent(params).replace(/%20/g, '+'),
      part: "snippet",
      type: "video",
      maxResults: 1,
      videoEmbeddable: "true",
      videoLicense: "any",
      videoType: "any"
    }, function(err, data) {
        if(typeof data.items[0] !== 'undefined'){
          message.channel.send("Ahoy! I found this music: https://www.youtube.com/watch?v="+data.items[0].id.videoId)
          console.log(`Sending Youtube Video :: ${data.items[0].id.videoId}`)
        } else {
          message.channel.send("I couldn't find any music with that name")
        }
    })

	},
};