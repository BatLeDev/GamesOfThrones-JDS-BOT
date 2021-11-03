const { MESSAGES } = require("../../utils/constants");
const { ROLEMJ } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    // Trouver le royaume
    // Trouver l'armée et la supprime

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

    // Trouve le royaume
    let royaume=""
    if (args.length>1&&bot.hasRole(message.member.roles.cache, ROLEMJ)) { // Si c'est un maitre du jeu
        if (message.mentions.roles.size >= 1) { // Chercher la mention
            royaume=royaumesList[rolesId.indexOf(message.mentions.roles.first().id)];
        } else if (royaumesList.includes(args[0])) {  // Chercher le nom royaume
            royaume = args[0]
        } else { // Si rien trouvé envoyer erreur
            return await message.reply("Vous devez choisir un royaume valide !")
        }
    } else {
        let role = bot.hasRole(message.member.roles.cache, rolesId); // Récupère l'id du role du royaume
        royaume = royaumesList[rolesId.indexOf(role)]; // Récupère le nom du royaume
    }

    let del=false // Passe a vraie si il supprime une armée
    for (let iarmee in fichier[royaume].Armies) {
        if (fichier[royaume].Armies[iarmee].name==args[0])  {
            fichier[royaume].Armies.splice(iarmee,1)
            await message.reply(`Votre armée ${args[0]} à bien été supprimée !`)
            del=true
        }
    }
    if (del===false) { // Si aucune armée n'est suprimée
        return await message.reply('Vous devez choisir une armée existante !')
    }
    
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.ERASE;
