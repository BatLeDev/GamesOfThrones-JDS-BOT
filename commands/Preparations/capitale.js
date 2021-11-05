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

            if (typeof fichier[Royaume].Capitale==="string") { // Si la capitale est déja définie
                return await interaction.reply({
                    content: `La capitale est déja définie. En cas de problème, contacter un <@${bot.config.ROLEMJ}>`,
                    ephemeral: false,
                })
            }

        } else { // Donc ce n'est pas un roi, et aucun royaume n'a été choisit par un maitre du jeu
            return interaction.reply({ // Si aucune armée n'est suprimée
                content: 'Il faut être un roi pour pouvoir executer cette commande !',
                ephemeral: true,
            })
        }
    }

    const Zone = interaction.options.getString("zone") // Récupère la zone choisie par l'utilisateur

    let zonesName = []; // La liste des noms de zones du royaume
    for (let zone of fichier[Royaume].Zones) {
        zonesName.push(zone.name);
    }

    if (!zonesName.includes(Zone)) { // Cherche si la zone fait parti du royaume
        return await interaction.reply({
            content: `Vous devez choisir une zone de votre royaume: ${zonesName}`,            
		    ephemeral: true,
        });
    }

    fichier[Royaume].Capitale = Zone;  //  On enregistre la nouvelle capitale
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier    
    bot.updateStats(Royaume) // On actualise les stats du royaume

    // Annonce au roi
	interaction.reply({
		content: 'Tu viens de choisir ta capitale ! Zieute ton salon statistiques :wink: ',
		ephemeral: false,
	})

    // Annonce à tout le monde
    await bot.channels.cache
    .get(bot.config.ANNONCEJEU)
    .send(`<@&${bot.config.ROLEJOUEUR}> La capitale des ${Royaume} a été établie en ${Zone} !`);

    bot.emit("endPhase1")  // On test la fin de la phase 1
};


module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.CAPITALE;