import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { bot } from '../index.js'
import fetch from 'node-fetch';

export const command = {
   data: new SlashCommandBuilder()
         .setName('apod')
         .setDescription('Replies with the Astronomy Picture of the Day.')
         .toJSON(),

   async execute(interaction:CommandInteraction) {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${bot.keys.nasa}`);
      let img:any;

      if(response.status == 200) {
         img = await response.json();
         const splited = img.date.split('-');

         const embed = new EmbedBuilder()
                        .setAuthor({name: 'Astronomy Picture of the Day.', url: img.hdurl, iconURL: 'https://i.imgur.com/9lYwUfm.jpg'})
                        .setColor(0x0D0D0D)
                        .setTitle('Image information:')
                        .setDescription(`**Title:** ${img.title}\n\**Copyright:** ${img.copyright}\n**Date:** ${splited.at(2)}/${splited.at(1)}/${splited.at(0)}`)
                        .setImage(img.url)
                        .setFooter({text: 'Staff do servidor Jealous King.', iconURL: 'https://imgur.com/GMWIN4J.png'});

         await interaction.reply({
            embeds: [embed]
         });
      } else {
         console.error(`[ERROR] An unexpected response was received from the nasa API in \'apod\' command. Status: ${response.status}.`);
         await interaction.reply({
            content: 'No images received...',
            ephemeral: true
         });
      }
   }
}
