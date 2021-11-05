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
    const listZones = Object.keys(bot.config.ZONEDESC); //  La liste de toutes les zones

    const Zone = interaction.options.getString("zone") // Récupère la zone choisie par l'utilisateur
    const Royaume = interaction.options.getString("royaume") // Récupère le nom du royaume, a la position de l'id du royaume

    if (!listZones.includes(Zone)) { // Verrifie si c'est une vrai zone
        return await interaction.reply({
            content: "Tu dois choisir un nom de zone valide !",            
		    ephemeral: true,
        })
    }

    var zoneobj={}

    // Cherche dans la liste des royaumes
    for (let royaume of bot.config.ROYAUMELIST) {
        for (let iZone in fichier[royaume].Zones) {
            if (fichier[royaume].Zones[iZone].name == Zone) {
                zoneobj=fichier[royaume].Zones[iZone] // On récupère le nom et les pR
                fichier[royaume].Zones.splice(iZone,1) // On supprime la zone
            }
        }
    }

    //Cherche dans la liste des zones
    for (let iZone in fichier.ZonesVides) {
        if (fichier.ZonesVides[iZone].name == Zone) {
            zoneobj=fichier.ZonesVides[iZone] // On récupère le nom et les pR
            fichier.ZonesVides.splice(iZone,1) // On supprime la zone
        }
    }

    fichier[Royaume].Zones.push(zoneobj); // On ajoute la zone
    await interaction.reply({
        content: `La zone ${Zone} appartient maintenant au royaume de ${Royaume}`,            
        ephemeral: false,
    })

    bot.moovezone(bot.config.ZONEDESC[zoneobj.name].ChanId, fichier[Royaume].CategorieId) // Déplace la zone dans la catégorie du royaume
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier     
    bot.updateStats(Royaume) // On actualise les stats du royaume
}

module.exports.help = MESSAGES.COMMANDS.PARTIE.SETZONE;