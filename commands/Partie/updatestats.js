const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)) { // Verrifie que c'est un maitre du jou
        return await interaction.reply({
            content: "Tu n'as pas la permission pour executer cette commande.",            
		    ephemeral: true,
        })
    };

	await interaction.reply({ // Si aucune armée n'est suprimée
		content: `Vous vennez d'actualiser tous les stats !`,
		ephemeral: true,
	})

    for (let Royaume of bot.config.ROYAUMELIST) {
        bot.updateStats(Royaume)
    }
};


module.exports.help = MESSAGES.COMMANDS.PARTIE.UPDATESTATS;