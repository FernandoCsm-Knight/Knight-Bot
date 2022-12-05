import { ButtonInteraction, channelMention, EmbedBuilder, GuildMember, userMention } from "discord.js";

export const button = {
   data: {
      name: 'confirm'
   },

   async execute(interaction:ButtonInteraction) {
      const channelID = '1049156239692664883';
      const channel = interaction.client.channels.cache.get(channelID);

      if(!channel.isTextBased()) {
         console.error('[WARNING] The channel ID in src/Components/ButtonSuccess is from an invalid channel.');
         await interaction.reply({
            content: `O canal ${channelMention(channelID)} não permite a execução do comando /suggestion.`,
            ephemeral: true
         });
      } else {
         const memberID = interaction.message.embeds.at(0).fields.at(0).value.replace('<', '').replace('>', '').replace('@', '');
         const member:GuildMember = interaction.guild.members.cache.get(memberID);

         const embed = new EmbedBuilder()
                        .setAuthor({name: `${member.user.tag}`})
                        .setThumbnail((member.user.avatarURL()) ? member.user.avatarURL() : 'https://i.imgur.com/Ul449n2.png')
                        .addFields(
                           {name: 'Mensão:', value: userMention(memberID)}
                        )
                        .setFooter({text: 'Staff do servidor Jealous King.', iconURL: 'https://imgur.com/GMWIN4J.png'});
         
         await channel.send({ embeds: [embed] });

         await interaction.message.delete();

         await interaction.reply({
            content: `Member ${userMention(memberID)} reported!`,
            ephemeral: true
         });
      }
   }
}
