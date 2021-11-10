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
    const army = interaction.options.getString("army")
    const pointtype = interaction.options.getString("pointtype")
    const value = interaction.options.getInteger("valeur")

    // Verrifie que c'est une armée valide
    let armyIndex = false
    for (let iarmy in fichier[Royaume].Armies) {
        if (fichier[Royaume].Armies[iarmy].name==army) {
            armyIndex=iarmy
        }
    }
    if (armyIndex===false) {
        return await interaction.reply({ // Affiche à l'utilisateur
            content: `Cette armée n'a pas été trouvée !`,
            ephemeral: true,
        })
    }

    fichier[Royaume].Armies[armyIndex][pointtype]=value

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
    bot.updateStats(Royaume) // Actualise le salon des stats   
    await interaction.reply({ // Affiche à l'utilisateur
        content: `Vous vennez de changer les ${pointtype} de l'armée ${army}`,
        ephemeral: true,
    })

};

module.exports.help = MESSAGES.COMMANDS.PARTIE.PSET;