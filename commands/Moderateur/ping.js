const { MESSAGES } = require("../../utils/constants");

module.exports.execute = async (bot, interaction) => {
	interaction.reply({
		content: "Pong!",
		ephemeral: true
	});
}

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.PING;