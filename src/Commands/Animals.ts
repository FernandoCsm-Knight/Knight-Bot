import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { bot } from "../index";
import { createClient, PhotosWithTotalResults, ErrorResponse } from 'pexels';

export const command = {
   data: new SlashCommandBuilder()
      .setName('animals')
      .setDescription('Returns a random animal picture!')
      .addStringOption((option) => 
         option
            .setName('animal')
            .setDescription('Type your favorite animal.')
            .setRequired(true)
            .setChoices(
               {
                  name: 'Bird',
                  value: 'Bird'
               },
               {
                  name: 'Cat',
                  value: 'Cat'
               },
               {
                  name: 'Dog',
                  value: 'Dog'
               },
               {
                  name: 'Duck',
                  value: 'Duck'
               },
               {
                  name: 'Fox',
                  value: 'Fox'
               },
               {
                  name: 'Lion',
                  value: 'Lion'
               },
               {
                  name: 'Panda',
                  value: 'Panda'
               }
            )
      )
      .toJSON(),

   async execute(interaction:CommandInteraction) {
      const args:string = interaction.options.get('animal').value.toString();
      const client = createClient(bot.keys.pexels);

      const response:PhotosWithTotalResults | ErrorResponse = await client.photos.search({
         page: 1,
         per_page: 20,
         query: args
      });

      if('photos' in response) {
         const num:number = Math.floor(Math.random() * response.photos.length);
         const photo = response.photos[num];
         const embed = new EmbedBuilder()
                           .setTitle('📷 ┃ Image from Pexels!')
                           .setURL(photo.url)
                           .setAuthor({name: photo.photographer, iconURL: 'https://i.imgur.com/CJmiQbV.png', url: photo.photographer_url})
                           .setColor(0x05a081)
                           .setFooter({text: 'Staff do servidor Jealous King.', iconURL: 'https://imgur.com/GMWIN4J.png'})
                           .setImage(photo.src.original);
         
         
         interaction.reply({
            embeds: [embed],
            ephemeral: false 
         });
      } else {
         interaction.reply({
            content: `An unexpected error ocurred during the api call in Pexels.`,
            ephemeral: true 
         });
      }
   }
};
