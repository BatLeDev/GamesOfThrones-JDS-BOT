const { Client, Collection} = require('discord.js');
const { loadCommands, loadEvents } = require("./utils/loader");

const bot = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: ['GUILDS', 'GUILD_MESSAGES'] });
require("./utils/functions")(bot);
bot.config = require("./config");
bot.commands = new Collection();

loadCommands(bot);
loadEvents(bot);

bot.login(bot.config.TOKEN); 