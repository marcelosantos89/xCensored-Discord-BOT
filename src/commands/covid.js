const csv = require('csv-parser');
const request = require('request');
const Discord = require('discord.js');

module.exports = {
  name: 'covid',
  description: 'Display current covid-19 information for Portugal',
  execute(message) {
    const results = [];
    request('https://raw.githubusercontent.com/dssg-pt/covid19pt-data/master/data.csv')
      .pipe(csv())
      .on('data', (row) => {
        results.push(row)
      })
      .on('end', () => {

        const exampleEmbed = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle('COVID-19 Portugal')
          .setURL('https://covid19.min-saude.pt/')
          .setDescription('Ponto de Situação Atual em Portugal')
          .setThumbnail('https://www.dgs.pt/upload/imagens/i032588.png')
          .addFields(
            { name: 'Data', value: results[results.length - 1].data },
            { name: 'Confirmados', value: results[results.length - 1].confirmados, inline: true },
            { name: 'Variacao (24h)', value: results[results.length - 1].confirmados - results[results.length - 2].confirmados, inline: true },
            { name: '\u200b', value: '\u200b', inline: true }
          )
          .addFields(
            { name: 'Recuperados', value: results[results.length - 1].recuperados, inline: true },
            { name: 'Variação (24h)', value: results[results.length - 1].recuperados - results[results.length - 2].recuperados, inline: true },
            { name: '\u200b', value: '\u200b', inline: true }
          )
          .addFields(
            { name: 'Óbitos', value: results[results.length - 1].obitos, inline: true },
            { name: 'Variação (24h)', value: results[results.length - 1].obitos - results[results.length - 2].obitos, inline: true },
            { name: '\u200b', value: '\u200b', inline: true }
          )
          // .addFields(
          //   { name: 'Suspeitos', value: results[results.length - 1].suspeitos, inline: true },
          //   { name: 'Variação (24h)', value: results[results.length - 1].suspeitos - results[results.length - 2].suspeitos, inline: true },
          // )
          .setTimestamp()

          message.channel.send(exampleEmbed);

      });

  },
};