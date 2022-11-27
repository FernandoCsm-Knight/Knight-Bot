import { Events, Interaction } from  'discord.js';
import { bot } from '../index.js';

export const event = {
   name: Events.InteractionCreate,
   once: false,
   async execute(interaction:Interaction) {
      if(!interaction.isChatInputCommand()) return;
      
      const command = bot.commands.get(interaction.commandName);
   
      if(!command) {
         console.error(`No command matching ${interaction.commandName} was found.`);
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
   }
}
