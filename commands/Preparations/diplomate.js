const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEJOUEUR)) {
        return await interaction.reply({
            content: `Vous n'êtes pas dans la partie! Demmandez à un <@&${bot.config.ROLEMJ}> pour rejoindre une partie.`,            
		    ephemeral: true,
        })
    };

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie
    let Royaume = null

    // Si c'est un moderateur
    if (bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)) {
        Royaume = interaction.options.getString("royaume"); // Récupère le nom du royaume, choisit par le modérateur 
    }

    if (!Royaume) { // Si le modérateur n'a pas choisit de royaume, c'est surement que c'est un joueur
        if (bot.hasRole(interaction.member.roles.cache, bot.config.ROLEROI)) { // Verrifie que c'est un roi

            const role = bot.hasRole(interaction.member.roles.cache, bot.config.ROYAUMEID); // Récupère l'id du role du royaume
            Royaume = bot.config.ROYAUMELIST[bot.config.ROYAUMEID.indexOf(role)]; // Récupère le nom du royaume, a la position de l'id du royaume

        } else { // Donc ce n'est pas un roi, et aucun royaume n'a été choisit par un maitre du jeu
            return interaction.reply({ // Si aucune armée n'est suprimée
                content: 'Il faut être un roi pour pouvoir executer cette commande !',
                ephemeral: true,
            })
        }
    }

    const JoueurId = interaction.options.getMember("joueur").id // Récupère le joueurId choisie par l'utilisateur

    if (!fichier[Royaume].Joueurs.includes(JoueurId)) { // Cherche si le joueur fait parti du royaume
        return await interaction.reply({
            content: `Vous devez choisir un joueur de votre royaume.`,            
		    ephemeral: true,
        });
    }

    fichier[Royaume].Diplomate = JoueurId;  //  On enregistre le nouveau diplomate
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier    
    bot.updateStats(Royaume) // On actualise les stats du royaume

    // Annonce au roi
	await interaction.reply({
		content: 'Tu viens de choisir ton diplomate ! Zieute ton salon statistiques :wink: ',
		ephemeral: true,
	})

    bot.emit("endPhase1")  // On test la fin de la phase 1
};


module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.DIPLOMATE;