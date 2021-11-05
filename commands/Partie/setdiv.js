const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEJOUEUR)) { //Verrifie que le joueur est dans la partie
        return await interaction.reply({
            content: `Vous n'êtes pas dans la partie! Demmandez à un <@&${bot.config.ROLEMJ}> pour rejoindre une partie.`,            
            ephemeral: true,
        })
    }

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    if (fichier.Phase<2) { // Vérrifie que l'on est dans la phase 2 ou plus
        return  await interaction.reply({
            content: "Vous devez être dans la phase 2 ou plus pour faire spawn des armées",            
		    ephemeral: true,
        })
    }

    const role = bot.hasRole(interaction.member.roles.cache, bot.config.ROYAUMEID); // Récupère l'id du role du royaume
    const Royaume = bot.config.ROYAUMELIST[bot.config.ROYAUMEID.indexOf(role)]; // Récupère le nom du royaume, a la position de l'id du royaume
    const zone = interaction.options.getString("zone") // Récupère la zone choisie par l'utilisateur

    let zonesName = []; // La liste des noms de zones du royaume
    for (let zone of fichier[Royaume].Zones) {
        zonesName.push(zone.name);
    }

    if (!zonesName.includes(zone)) { // Cherche si la zone fait parti du royaume
        return await interaction.reply({
            content: `Vous devez choisir une zone de votre royaume: ${zonesName}`,            
		    ephemeral: true,
        });
    }

    if (fichier[Royaume].Gallions<300) { // Test si assez de gallions
        return await interaction.reply({
            content: `Vous n'avez pas assez de Gallions !`,            
		    ephemeral: true,
        });
    }

    // Compte le nombre d'armée déja rattaché à cette zone
    var compteur=0
    for (let armee of fichier[Royaume].Armies) {
        let zoneName=armee.name.split('|')[armee.name.length-2]
        if (zoneName==zone) { // Si le nom de la zone est la même que la zone que l'on veut rajouter,
            compteur+=1 // On ajoute +1 au nombre d'armées qui sont déja rattaché à cette zone
        }
    }
    if (compteur==2) { // Si il y a déjà 2 armées rattachés a cette zone 
        return await interaction.reply({
            content: "Vous avez deja 2 armées rattachés à cette zone",            
		    ephemeral: true,
        });
    }

    div={ // On génère l'object de l'armée
        "name":`Div|${zone}|${compteur+1}`, // Div, nom de la zone de rattachement, si c'est la première ou la 2ème armée rattachée a cette zone
        "loc":zone, // Localisation de l'armée
        "pA":1, // Stats de base
        "pD":2,
        "pE":8
    }

    fichier[Royaume].Armies.push(div) // On ajoute la division a la liste du royaume
    fichier[Royaume].Gallions-=300 // On retire le coût

    await interaction.reply({
        content: `Vous vennez de creer la division ${div.name} ! Cela vous a coûté 300 Gallions.`,            
        ephemeral: false,
    });

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier    
    bot.updateStats(Royaume) // On actualise les stats du royaume
}

module.exports.help = MESSAGES.COMMANDS.PARTIE.SETDIV;