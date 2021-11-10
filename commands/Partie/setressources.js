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
    const Royaume = interaction.options.getString("royaume")
    const ressource = interaction.options.getString("ressource")
    const value = interaction.options.getInteger("valeur")

    fichier[Royaume][ressource]=value

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
    bot.updateStats(Royaume) // Actualise le salon des stats   
    await interaction.reply({ // Affiche à l'utilisateur
        content: `Vous vennez de changer la ressource **${ressource}** du royaume **${Royaume}**`,
        ephemeral: true,
    })
}

module.exports.help = MESSAGES.COMMANDS.PARTIE.SETRESSOURCES;