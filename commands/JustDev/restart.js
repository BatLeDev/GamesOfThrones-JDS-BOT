const { MESSAGES } = require("../../utils/constants");

module.exports.execute = async (bot, interaction) => {
    if (interaction.member.id != "403589929877372928") {
        // Verrifie que c'est un maitre du jeu
        return await interaction.reply({
            content: "Tu n'as pas la permission pour executer cette commande.",
            ephemeral: true,
        });
    }

    await interaction.reply({
        content: "Le bot redemarre...",
        ephemeral: true,
    });

    process.exit(); // Force l'arret du bot
};

module.exports.help = MESSAGES.COMMANDS.JUSTDEV.RESTART;
