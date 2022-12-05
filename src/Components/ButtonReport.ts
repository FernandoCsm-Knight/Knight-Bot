import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, MessageFlags } from "discord.js";

export const button = {
   data: {
      name: 'report'
   },
   
   async execute(interaction:ButtonInteraction) {
      const row = new ActionRowBuilder<ButtonBuilder>()
                  .addComponents(
                     new ButtonBuilder()
                     .setCustomId('confirm')
                     .setLabel('Yes')
                     .setStyle(ButtonStyle.Success)
                  )
                  .addComponents(
                     new ButtonBuilder()
                     .setCustomId('decline')
                     .setLabel('No')
                     .setStyle(ButtonStyle.Danger)
                  );
      
      await interaction.reply({
         content: 'Are you sure?',
         embeds: interaction.message.embeds,
         components: [row]
      });
   }
}