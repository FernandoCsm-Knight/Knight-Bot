import { CommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { bot } from '../index.js';
import fetch from 'node-fetch';

export const command = {
   data: new SlashCommandBuilder() 
         .setName('weather')
         .setDescription('Replies with general informations about the weather.')
         .addStringOption(options =>
            options
               .setName('city')
               .setDescription('Type the name of your city.')
               .setRequired(true)
         )
         .toJSON(),
   async execute(interaction:CommandInteraction) {
      const cityName = interaction.options.get('city').value;

      try {
         let cityObj = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${bot.keys.openWeather}`);

         cityObj = await cityObj.json();

         if(cityObj.length > 0) {
            cityObj = cityObj[0];
            const cityLon = cityObj.lon;
            const cityLat = cityObj.lat;

            let cityWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${bot.keys.openWeather}`);

            cityWeather = await cityWeather.json();

            const name:string = cityWeather.name;
            const state:string = cityObj.state;
            const country:string = cityWeather.sys.country;
            const id:number = cityWeather.id;
            const wheatherMain:string = cityWeather.weather[0].main;
            const weatherState:string = cityWeather.weather[0].description;
            const celcius:number = cityWeather.main.temp - 273.15;
            const feelsLike:number = cityWeather.main.feels_like - 273.15;
            const humidity:number = cityWeather.main.humidity;
            const windSpeed:number = cityWeather.wind.speed;
            const pressure:number = cityWeather.main.pressure;
            const visibility:number = cityWeather.visibility;

            const embed = new EmbedBuilder()
                           .setDescription(`Tempo em ${name} - ${state} - ${country}`)
                           .setAuthor({ name: 'Bot Knight [>weather].', url: `https://openweathermap.org/city/${id}`, iconURL: 'https://i.imgur.com/YLo7iTG.jpg'})
                           .setThumbnail('https://i.imgur.com/YLo7iTG.jpg')
                           .setColor(0x38505c)
                           .setTimestamp(Date.now())
                           .addFields(
                              {name: 'Longitude e Latitude.', value: `lon = ${cityLon} \nlat = ${cityLat}.`, inline: true},
                              {name: 'Condições:', value: `${wheatherMain}\n${weatherState}`, inline: true},
                              {name: 'Temperatura', value: `${celcius.toFixed(0)}°C/${((celcius * 9/5) + 32.0).toFixed(0)}°F`, inline: true},
                              {name: 'Sensação Térmica:', value: `${feelsLike.toFixed(0)}°C/${((feelsLike * 9/5) + 32.0).toFixed(0)}°F`, inline: true},
                              {name: 'Humidade:', value: `${humidity}%`, inline: true},
                              {name: 'Vento (velocidade):', value: `${windSpeed.toFixed(2)} m/s`, inline: true},
                              {name: 'Pressão atmosférica:', value: `${(pressure * 0.000986923266716013).toFixed(2)} atm`, inline: true},
                              {name: 'Visibilidade:', value: `${(visibility / 1000).toFixed(2)} km`, inline: true}
                           )
                           .setFooter({text: 'Staff do servidor Jealous King.', iconURL: 'https://imgur.com/GMWIN4J.png'});

            await interaction.reply({
               embeds: [embed],
               ephemeral: false
            })

         } else {
            await interaction.reply({
               content: `Couldn\'t find ${cityName} in OpenWeather API.`,
               ephemeral: true
            });
         }
      } catch(err) {
         await interaction.reply({
            content: 'An unexpected error ocurred during OpenWeder API call.',
            ephemeral: true
         });
         console.error(err);
      }
   }
};
