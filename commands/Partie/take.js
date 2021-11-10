const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEJOUEUR)) { //Verrifie que le joueur est dans la partie
        return await interaction.reply({
            content: `Vous n'êtes pas dans la partie! Demmandez à un <@&${bot.config.ROLEMJ}> pour rejoindre une partie.`,            
            ephemeral: true,
        })
    }

    // Test si c'est un bon nom de zone
    // Test si elle est libre
    // Test assez d'argent
    // Test si armée présente
    // Moove la zone

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    const listZones = Object.keys(bot.config.ZONEDESC); // Récupère la liste des noms de zones 
    
    const role = bot.hasRole(interaction.member.roles.cache, bot.config.ROYAUMEID); // Récupère l'id du role du royaume
    const Royaume = bot.config.ROYAUMELIST[bot.config.ROYAUMEID.indexOf(role)]; // Récupère le nom du royaume, a la position de l'id du royaume
    const Zone = interaction.options.getString("zone") // Récupère la zone choisie par l'utilisateur

    if (!listZones.includes(Zone)) { // Test si l'argument est un nom de zone
        return await interaction.reply({
            content: `Vous devez choisir un nom de zone valide`,            
		    ephemeral: true,
        });
    }


    if (fichier[Royaume].Gallions<200) { // Test assez d'argent
        return await interaction.reply({
            content: `Vous n'avez pas assez de Gallions`,            
		    ephemeral: true,
        });
    }
    
    // Test la présence d'une armée
    let armeePresence=false // Passe à vrai si une armée à soi est présente sur la zone
    for (let iarmee in fichier[Royaume].Armies) {
        if (fichier[Royaume].Armies[iarmee].loc==Zone)  {
            armeePresence=iarmee
        }
    }
    if (armeePresence===false) { // Si il n'y a pas d'armée appartenant au royaume sur la zone
        return await interaction.reply({
            content: "Vous devez avoir une armée présente sur la zone pour pouvoir la prendre",            
		    ephemeral: true,
        });
    }
    if (fichier[Royaume].Armies[armeePresence].pE) {
        return await interaction.reply({
            content: "Votre armée doit avoir au moins 1 pE pour revendiquer cette zone !",            
		    ephemeral: true,
        });
    }

    // Trouve la zone
    zonelibre=false // Passe a vrais si la zone est libre

    // On cherhce dans les zones vides 
    for (let izone in fichier.ZonesVides) {
        if (fichier.ZonesVides[izone].name==Zone) {
            zonelibre=fichier.ZonesVides[izone] // Récupère l'object de la zone
            fichier.ZonesVides.splice(izone,1)  // Retire la zone
        }
    }

    // On cherhe dans les zones possédés par des royaumes
    for (let royaume of bot.config.ROYAUMELIST) {
        for (let izone in fichier[royaume].Zones) {
            if (fichier[royaume].Zones[izone].name==Zone&&fichier[royaume].Zones[izone].pR==0) { // Si la zone n'a plus de pR
                zonelibre=fichier[royaume].Zones[izone] // Récupère l'object de la zone
                fichier[royaume].Zones.splice(izone,1) // Retire la zone
            }
        }
    }
    if (zonelibre===false) { // Si la zone n'est pas libre, on affiche une erreure 
        return await interaction.reply({
            content: "Cette zone n'est pas libre, ou elle a encore des pR",            
		    ephemeral: true,
        });
    }

    await interaction.reply({
        content: `Vous vennez de prendre la zone ${Zone}`,            
        ephemeral: false,
    });

    fichier[Royaume].Gallions-=200 // On retire le cout de la commande
    fichier[Royaume].Armies[armeePresence].pE-=1 // Retire l'energie a l'armée en question

    fichier[Royaume].Zones.push(zonelibre);  // On ajoute la zone
    bot.moovezone(bot.config.ZONEDESC[zonelibre.name].ChanId, fichier[Royaume].CategorieId)    
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
    bot.updateStats(Royaume)
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.TAKE;
