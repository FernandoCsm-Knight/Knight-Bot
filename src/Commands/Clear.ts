import { CommandInteraction, GuildTextBasedChannel, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export const command = {
   data: new SlashCommandBuilder()
         .setName('clear')
         .setDescription('Delete the latest channel messages.')
         .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
         .addIntegerOption(option => 
            option
               .setName('number_of_messages')
               .setDescription('Number of messages that will be deleted.')
               .setMinValue(0)
               .setMaxValue(100)
               .setRequired(true)
         )
         .toJSON(),

   async execute(interaction:CommandInteraction) {
      const channel:GuildTextBasedChannel = interaction.channel;
      const num = interaction.options.get('number_of_messages').value;
      let messages = channel.messages.cache;

      if(num) {
         let i = 0;
         while(i < num && i < messages.size) {
            messages.at(i).delete();
            i++;
         }
         
         if(i < num) {
            messages = await channel.messages.fetch();

            while(i < num && i < messages.size) {
               messages.at(i).delete();
               i++;
            }
         }

         await interaction.reply({
            content: 'Everything is done!',
            ephemeral: true
         });
      } else {
         console.error('[ERROR] An unexpected error ocurred in src/Commands/Clear.ts');
         await interaction.reply({
            content: 'There was an error while executing this command!',
            ephemeral: true
         });
      }
   }
}

