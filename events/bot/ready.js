const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = {
	execute(bot) {	
		console.log(`Je suis connecté sous le nom de ${bot.user.username}`);
		const BOT_ID = bot.user.id;

		const rest = new REST({
			version: "9",
		}).setToken(bot.config.TOKEN);

		(async () => {
			try {
				await rest.put(
					Routes.applicationGuildCommands(BOT_ID, "702822547124781058"),
					{
						body: bot.commandList,
					}
				);
			} catch (err) {
				if (err) console.error(err);
			}
		})();
	},
};
