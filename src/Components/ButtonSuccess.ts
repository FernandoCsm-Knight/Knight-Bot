import { ButtonInteraction, Channel, channelMention, EmbedBuilder, userMention } from "discord.js";

export const button = {
   data: {
      name: 'success'
   },

   async execute(interaction:ButtonInteraction) {
      const channelID:string = '1049148150310506586';
      const channel:Channel = interaction.client.channels.cache.get(channelID); 

      if(!channel.isTextBased()) {
         console.error('[WARNING] The channel ID in src/Components/ButtonSuccess is from an invalid channel.');
         await interaction.reply({
            content: `O canal ${channelMention(channelID)} não permite a execução do comando /suggestion.`,
            ephemeral: true
         });
      } else {
         const embed = new EmbedBuilder()
                        .setAuthor({ name: interaction.message.embeds.at(0).author.name })
                        .setThumbnail((interaction.message.embeds.at(0).thumbnail.url) ? interaction.message.embeds.at(0).thumbnail.url : 'https://i.imgur.com/Ul449n2.png')
                        .addFields(
                           {name: 'Sugestão:', value: `${interaction.message.embeds.at(0).fields.at(1).value}`, inline: false},
                           {name: 'Enviada em:', value: `${interaction.message.embeds.at(0).fields.at(2).value}`},
                           {name: 'Aprovada por:', value: userMention(interaction.member.user.id), inline: false}
                        )
                        .setFooter({text: 'Staff do servidor Jealous King.', iconURL: 'https://imgur.com/GMWIN4J.png'});
                           
         await channel.send( { embeds: [embed] } );

         await interaction.reply({
            content: 'Mensagem enviada com sucesso!',
            ephemeral: true
         });
      }
   }
}