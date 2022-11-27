import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } from 'discord.js';

export const command = {
   data: new SlashCommandBuilder()
         .setName('userinfo')
         .setDescription('Replies with the mentioned user information.')
         .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
         .addMentionableOption(option =>
            option
               .setName('user_mention')
               .setDescription('The required user mention.')
               .setRequired(true)
         )
         .toJSON(),
   async execute(interaction:CommandInteraction) {
      const mention = interaction.options.get('user_mention').value;
      const user = interaction.guild.members.cache.get(mention.toString());
      console.log(user);
   }
}