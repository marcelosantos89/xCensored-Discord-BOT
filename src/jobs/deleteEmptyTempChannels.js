const Discord = require('discord.js');

module.exports = {
  execute(message) {
    var channels = message.guild.channels.cache.filter(c => c.name.indexOf("Temp") !== -1 && c.type == "voice");
    channels.forEach(function(channel){
      if(channel.members.size === 0)
      {
        channel.delete()
      }
    });
  }
}