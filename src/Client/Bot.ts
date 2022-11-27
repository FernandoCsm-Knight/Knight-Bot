import { Client, ClientOptions, Collection, CommandInteraction, GatewayIntentBits, REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import { commands } from '../Commands/CommandsLib.js';

export class Bot {
   private _TOKEN:string;
   private _GUILD_ID:string;
   private _CLIENT_ID:string;

   private _keys;

   private _client:Client;
   private _rest:REST;
   private _commands:Collection<any, any>;

   public constructor(options:ClientOptions = undefined) {
      if(options == undefined) options = { 
         intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
         ]
      };

      config();
      
      this._TOKEN = process.env.BOT_TOKEN;
      this._CLIENT_ID = process.env.CLIENT_ID;
      this._GUILD_ID = process.env.GUILD_ID;

      this._keys = this._apiKeys();

      this._commands = new Collection<any, any>();
      this._client = new Client(options);
      this._rest = new REST({ version: '10' }).setToken(this._TOKEN);
   }

   get client() {
      return this._client;
   }

   get rest() {
      return this._rest;
   }

   get token() {
      return this._TOKEN;
   }

   get id() {
      return this._CLIENT_ID;
   }

   get guild() {
      return this._GUILD_ID;
   }

   get commands() {
      return this._commands;
   }

   get keys() {
      return this._keys;
   }

   private _apiKeys() {
      const obj = {
         pexels: process.env.PEXELS_API,
         openWeather: process.env.WEATHER_API
      }

      Object.freeze(obj);
      return obj;
   }

   public async run() {
      console.log('Started refreshing application (/) commands.');
      await this.rest.put(Routes.applicationGuildCommands(this.id, this.guild), {
         body: commands
      });
      console.log('Successfully reloaded application (/) commands.');

      this.client.login(this._TOKEN);
      this._ready();
   }

   private _ready() {
      this.client.on('ready', () => {
         console.log('\nHello, I\'am Alive!');
         console.log(`Bot: ${this.client.user.tag}`);
         console.log(`Time: ${this.client.uptime} second(s)\n`);
      });
   }
}