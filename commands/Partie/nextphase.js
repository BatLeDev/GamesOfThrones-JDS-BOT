const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)) { // Verrifie que c'est un maitre du jou
        return await interaction.reply({
            content: "Tu n'as pas la permission pour executer cette commande.",            
		    ephemeral: true,
        })
    };

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    let lastPhase = fichier.Phase
    if (fichier.Phase == 1) { // Annonce le passage a la phase 3
        await bot.channels.cache
            .get(bot.config.ANNONCEJEU)
            .send(`<@&${bot.config.ROLEJOUEUR}> La phase 2 commence !`);
        fichier.Phase = 2;
    }

    if (fichier.Phase == 2) { // Annonce le passage a la phase 3
        await bot.channels.cache
            .get(bot.config.ANNONCEJEU)
            .send(`<@&${bot.config.ROLEJOUEUR}> La phase 3 commence !`);
        fichier.Phase = 3;
    }

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier

    if (lastPhase==fichier.Phase) {
        interaction.reply({ // Si aucune armée n'est suprimée
            content: `Vous ne pouvez pas changer la phase ${lastPhase} !`,
            ephemeral: true,
        })
    } else {
        interaction.reply({ // Si aucune armée n'est suprimée
            content: `Vous vennez de faire passer la phase ${lastPhase} à la phase ${fichier.Phase}!`,
            ephemeral: true,
        })
    }
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.NEXTPHASE;