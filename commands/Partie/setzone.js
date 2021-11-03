const { MESSAGES } = require("../../utils/constants");
const { ZONEDESC, ROLEMJ } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    // Définie une zone à un royaume
    // Retire cette zone à l'autre royaume si elle fait deja parti d'un royaume

    if (!bot.hasRole(message.member.roles.cache, ROLEMJ)) { // Test si c'est un modérateur
        return await message.reply("Vous n'avez pas la permission pour faire cette commande !")
    }

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie
    royaumesList = [
        "Arryn",
        "Baratheon",
        "Greyjoy",
        "Lannister",
        "Martell",
        "Stark",
        "Targaryen",
        "Tyrell"
    ];
    rolesId = [
        "702823145668739142",
        "702823256578719846",
        "702838713775816734",
        "702822919511867411",
        "702823114320642128",
        "702822841443155988",
        "702822871491149844",
        "702823220331675648",
    ];

    const listZones = Object.keys(ZONEDESC); //  La liste de toutes les zones
    var royaumeName = "";
    if (!listZones.includes(args[0])) { // Verrifie si c'est une vrai zone
        return await message.reply(
            "Vous devez choisir un nom de zone valide !"
        );
    }
    if (message.mentions.roles.size < 1) { // Si aucun royaume est mentionné
        if (!royaumesList.includes(args[1])) { // Test si le royaume est bien écrit 
            return await message.reply(
                "Vous devez choisir un royaume valide !"
            );
        } else {
            royaumeName = args[1]; // Enregitre le nom du royaume
        }
    } else {   
        royaumeName = royaumesList[rolesId.indexOf(message.mentions.roles.first().id)]; // Enregistre le nom du royaume à partir de la mention
    }

    var zoneobj={}
    for (let royaume of royaumesList) {      
        for (let iZone in fichier[royaume].Zones) {
            if (fichier[royaume].Zones[iZone].name == args[0]) {
                zoneobj=fichier[royaume].Zones[iZone] // On récupère le nom et les pR
                fichier[royaume].Zones.splice(iZone,1) // On supprime la zone
            }
        }
    }

    fichier[royaumeName].Zones.push(zoneobj); // On ajoute la zone
    await message.reply(
        `La zone ${args[0]} appartiens maintenant au royaume de ${royaumeName}`
    );
    //TODO Deplacer la zone

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.SETZONE;
