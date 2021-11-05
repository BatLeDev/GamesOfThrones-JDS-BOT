const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {
    
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)) { // Verrifie que c'est un maitre du jou
        return await interaction.reply({
            content: "Tu n'as pas la permission pour executer cette commande.",            
		    ephemeral: true,
        })
    };

    // Reset la partie
    const fichierInitial = fs.readFileSync("partieVierge.json"); // On récupère le fichier vierge
    fs.writeFileSync("partieTest.json", fichierInitial); // On reset la nouvelle partie

    await interaction.reply({
        content: "La partie est reset",            
        ephemeral: true,
    })
}

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.RESET;