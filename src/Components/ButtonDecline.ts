import { ButtonInteraction } from "discord.js";

export const button = {
   data: {
      name: 'decline'
   },

   async execute(interaction:ButtonInteraction) {
      await interaction.message.delete();

      await interaction.reply({
         content: 'Report aborted.',
         ephemeral: true
      });
   }
}