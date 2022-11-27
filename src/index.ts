import { readdirSync } from 'node:fs';
import * as path from 'node:path';

import { Bot } from './Client/Bot.js';

export const bot = new Bot();

/**
 * Accesses the comand files
 */
const commandPath = path.join(__dirname, 'Commands');
const files = readdirSync(commandPath).filter(file => file.endsWith('.js'));

files.forEach(file => {
   const filePath = path.join(commandPath, file);
	const command = require(filePath).command;
      
	if(command && 'data' in command && 'execute' in command) {
		bot.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
});


/**
 * Accesses the event files
 */
const eventsPath = path.join(__dirname, 'Events');
const events = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

events.forEach(file => {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath).event;

	if (event.once) {
		bot.client.once(event.name, (...args) => event.execute(...args));
	} else {
		bot.client.on(event.name, (...args) => event.execute(...args));
	}
});

bot.run();
