const Youtube = require("youtube-api")
require('dotenv').config()

module.exports = {
  name: 'create-channel',
  description: 'Create a temporary channel',
  args: true,
  usage: '<user_limit>',
  execute(message, args) {
    let params = args.toString().replace(/,/g, ' ');
    let category = message.guild.channels.cache.find(c => c.name == "Temp Channels" && c.type == "category");
    let name = message.author.username;

    message.guild.channels.create("Temp :: "+ name, {
      type: 'voice',
      userLimit: params,
    }).then(channel => {
      channel.setParent(category.id)
    })

  },
};