const { Client, Intents, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./utils/loader");

const bot = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES
	]
});


require("./utils/functions")(bot); // Récupère les fonctions
bot.config = require("./config"); // Récupère le fihcier de configuration

bot.commands = new Collection();

loadCommands(bot);
loadEvents(bot);

bot.login(bot.config.TOKEN); // Démarre le bot