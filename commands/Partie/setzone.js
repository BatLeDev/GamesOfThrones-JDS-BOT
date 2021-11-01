const { MESSAGES } = require("../../utils/constants");
const { ZONEDESC } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    // Définie une zone à un royaume
    // Retire cette zone à l'autre royaume si elle fait deja parti d'un royaume

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie
    royaumesList = [
        "Arryn",
        "Baratheon",
        "Greyjoy",
        "Lannister",
        "Martell",
        "Stark",
        "Targaryen",
        "Tyrell",
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

    const listZones = Object.keys(ZONEDESC);
    var royaumeName = "";
    if (!listZones.includes(args[0])) {
        return await message.reply(
            "Vous devez choisir un nom de zone valide !"
        );
    }
    if (args.length == 2) {
        if (
            !royaumesList.includes(args[1]) &&
            message.mentions.roles.size < 1
        ) {
            return await message.reply(
                "Vous devez choisir un royaume valide !"
            );
        }
        royaumeName = args[1];
    } else if (message.mentions.roles.size < 1) {
        return await message.reply("Vous devez choisir un royaume valide !");
    } else {
        royaumeName =
            royaumesList[rolesId.indexOf(message.mentions.roles.first().id)];
    }

    for (let royaume of royaumesList) {        
        for (let iZone in fichier[royaume].Zones) {
            if (fichier[royaume].Zones[iZone] == args[0]) {
                fichier[royaume].Zones.splice(iZone, 1);
            }
        }
    }

    fichier[royaumeName].Zones.push(args[0]);
    await message.reply(
        `La zone ${args[0]} appartiens maintenant au royaume de ${royaumeName}`
    );
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.SETZONE;
