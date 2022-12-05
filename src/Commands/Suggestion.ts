import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder, Channel, EmbedBuilder, channelMention, userMention, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { bot } from '../index.js';

export const command = {
   data: new SlashCommandBuilder()
         .setName('suggestion')
         .setDescription('Tell us your suggestion for our server.')
         .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
         .addStringOption(option =>
            option
               .setName('message')
               .setDescription('Type your suggestion.')
               .setMaxLength(1000)
               .setRequired(true)   
         )
         .toJSON(),

   async execute(interaction:CommandInteraction) {
      const msg = interaction.options.get('message').value;
      const channelID:string = '1046882506349228192';
      const channel:Channel = bot.client.channels.cache.get(channelID); 
      if(!channel.isTextBased()) {
         console.error('[WARNING] The channel ID in src/Commands/Suggestion is from an invalid channel.');
         await interaction.reply({
            content: `O canal ${channelMention(channelID)} não permite a execução do comando /suggestion.`,
            ephemeral: true
         });
      } else {
         const date:Date = new Date(Date.now());

         const row = new ActionRowBuilder<ButtonBuilder>()
                     .addComponents(
                        new ButtonBuilder()
                        .setCustomId('success')
                        .setLabel('Aprovado')
                        .setStyle(ButtonStyle.Success)
                     )
                     .addComponents(
                        new ButtonBuilder()
                        .setCustomId('failed')
                        .setLabel('Reprovado')
                        .setStyle(ButtonStyle.Secondary)
                     )
                     .addComponents(
                        new ButtonBuilder()
                        .setCustomId('report')
                        .setLabel('Reportar')
                        .setStyle(ButtonStyle.Danger)
                     )

         const embed = new EmbedBuilder()
                        .setAuthor({name: `${interaction.user.username} enviou uma sugestão:`})
                        .setThumbnail((interaction.user.avatarURL()) ? interaction.user.avatarURL() : 'https://i.imgur.com/Ul449n2.png')
                        .addFields(
                           {name: 'Mensão:', value: `${userMention(interaction.user.id)}`, inline: false},
                           {name: 'Conteúdo', value: `${msg}`, inline: false},
                           {name: 'Mensagem enviada em:', value: `Data: ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}\nHoras: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`, inline: false},
                        )
                        .setFooter({text: 'Staff do servidor Jealous King.', iconURL: 'https://imgur.com/GMWIN4J.png'});

         await channel.send( { embeds: [embed], components: [row] } );

         await interaction.reply({
            content: 'Mensagem enviada com sucesso!',
            ephemeral: true
         });
      }
   }
};