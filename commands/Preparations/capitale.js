const { MESSAGES } = require("../../utils/constants");
const { ROLEMJ, ROLEROI, ANNONCEJEU } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
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

    if (args.length == 2 && bot.hasRole(message.member.roles.cache, ROLEMJ)) {
        // Si c'est un maitre du jeu
        if (!royaumesList.includes(args[1]))
            // Si c'est pas un nom de royaume
            return await message.reply(
                "Vous n'avez pas choisit un royaume valide, voici la liste des royaumes: `Arryn, Baratheon, Greyjoy, Lannister, Martell, Stark, Targaryen, Tyrell`"
            );
        Royaume = args[1]; // On définit le nom du royaume
    } else {
        role = bot.hasRole(message.member.roles.cache, rolesId); // Récupère l'id du role du royaume
        Royaume = royaumesList[rolesId.indexOf(role)]; // Récupère le nom du royaume
    }

    if (!bot.hasRole(message.member.roles.cache, ROLEROI))
        return await message.reply(
            "Il faut être un roi pour pouvoir executer cette commande!"
        );
    if (!fichier[Royaume].Zones.includes(args[0]))
        return await message.reply(
            `Vous devez choisir une zone de votre royaume ! \`${fichier[Royaume].Zones}\``
        );

    fichier[Royaume].Capitale = args[0];
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
    await bot.channels.cache
        .get(ANNONCEJEU)
        .send(`La capitale des ${Royaume} a été établie en ${args[0]} !`);
};

module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.CAPITALE;
