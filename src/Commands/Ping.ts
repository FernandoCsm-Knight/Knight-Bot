import { SlashCommandBuilder, PermissionFlagsBits, CommandInteraction } from 'discord.js';

export const command = {
   data: new SlashCommandBuilder()
         .setName('ping')
         .setDescription('Replies with pong!')
         .setDefaultMemberPermissions(PermissionFlagsBits.ManageWebhooks)
         .toJSON(),
   async execute(interaction:CommandInteraction) {
      await interaction.reply({
         content: `Pong Client! ${interaction.client.ws.ping}ms`,
         ephemeral: true
      });
   }
};
