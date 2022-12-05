import { command as pingCommand } from '../Commands/Ping.js';
import { command as animalCommand } from '../Commands/Animals.js';
import { command as weatherCommand } from '../Commands/Weather.js';
import { command as userInfoCommand } from '../Commands/UserInfo.js';
import { command as suggestionCommand } from '../Commands/Suggestion.js';
import { command as clearCommand } from '../Commands/Clear.js';

export const commands = [
   pingCommand.data,
   animalCommand.data,
   weatherCommand.data,
   userInfoCommand.data,
   suggestionCommand.data,
   clearCommand.data
];