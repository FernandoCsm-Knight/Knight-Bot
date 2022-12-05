import { ButtonInteraction } from "discord.js";

export const button = {
   data: {
      name: 'failed'
   },
   
   async execute(interaction:ButtonInteraction) {
      await interaction.message.delete();

      await interaction.reply({
         content: 'Mensagem descartada!',
         ephemeral: true
      });
   }
}