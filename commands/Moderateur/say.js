const { MESSAGES } = require("../../utils/constants");

module.exports.execute = async (bot, interaction) => {
	interaction.reply({
		content: interaction.options.getString("message"),
		ephemeral: true,
	});
};


module.exports.help = MESSAGES.COMMANDS.MODERATEUR.SAY;