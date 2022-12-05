import { Events, Interaction } from  'discord.js';
import { command } from '../Commands/Ping.js';
import { bot } from '../index.js';

export const event = {
   name: Events.InteractionCreate,
   once: false,
   async execute(interaction:Interaction) {
      if(interaction.isChatInputCommand()) {
         const command = bot.commands.get(interaction.commandName);
      
         if(!command) {
            console.error(`[ERROR] No command matching ${interaction.commandName} was found.`);
            await interaction.reply({ 
               content: `No command matching ${interaction.commandName} was found.`, 
               ephemeral: true 
            });
         } else {
            try {
               await command.execute(interaction);
            } catch (err) {
               console.error(err);
               await interaction.reply({ 
                  content: 'There was an error while executing this command!', 
                  ephemeral: true 
               });
            }
         }
      } else if(interaction.isButton()) {
         const button = bot.buttons.get(interaction.customId);

         if(!button) {
            console.error(`[ERROR] No button matching ${interaction.customId} was found.`);
            await interaction.reply({
               content: `No button matching ${interaction.customId} was found.`,
            });
         } else {
            try {
               await button.execute(interaction);
            } catch(err) {
               console.error(err);
               await interaction.reply({
                  content: 'There was an error while executing this command!',
                  ephemeral: true
               });
            }
         }
      }
   }
}
