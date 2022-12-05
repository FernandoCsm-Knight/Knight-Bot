import { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, userMention, roleMention } from 'discord.js';

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
      const member = interaction.guild.members.cache.get(mention.toString());

      let roles = [];
      if(member.roles.cache.size > 1) {
         const arr = member.roles.cache.map(role => roleMention(role.id));

         for(let i = 0; i < arr.length; i++) 
            if(arr[i] != '<@&1045256612811636806>') roles.push(arr[i]);
      } else roles = member.roles.cache.map(role => roleMention(role.id));

      if(member) {
         const embed = new EmbedBuilder()
                        .setTitle(`Informações do usuário ${member.user.username}`)
                        .setDescription(`Aqui estão as informações ${userMention(interaction.member.user.id)}`)
                        .setColor(0x00BFFF)
                        .setThumbnail((member.user.avatarURL()) ? member.user.avatarURL() : 'https://i.imgur.com/Ul449n2.png')
                        .setFields(
                           {name: 'Entrou no servidor:', value: member.joinedAt.toUTCString(), inline: true},
                           {name: 'Tag de usuário:', value: member.user.tag, inline: true},
                           {name: 'Nick-name:', value: (member.nickname) ? member.nickname : 'Sem nickname', inline: true},
                           {name: 'Mention:', value: userMention(member.user.id), inline: true},
                           {name: 'Identificador:', value: member.user.id, inline: true},
                           {name: 'Bot:', value: (member.user.bot) ? 'Sou um Bot!' : 'Não sou um Bot!', inline: true},
                           {name: 'Cargos', value: roles.join('\n'), inline: false}
                        )
                        .setFooter({text: 'Staff do servidor Jealous King.', iconURL: 'https://imgur.com/GMWIN4J.png'})

         await interaction.reply({
            embeds: [embed],
            ephemeral: true
         });
      } else {
         await interaction.reply({
            content: 'No user found!',
            ephemeral: true
         });
      }
   }
};