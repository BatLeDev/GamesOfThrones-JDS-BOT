const { MESSAGES } = require("../../utils/constants");
const { ROLEMJ, ROLEROI } = require("../../config");
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
    var role="";
    var Royaume="";

    if (args.length == 2 && bot.hasRole(message.member.roles.cache, ROLEMJ)) { // Si c'est un maitre du jeu
        // Récupère l'id du royaume
        if (!royaumesList.includes(args[1]))
            // Si c'est pas un nom de royaume
            return await message.reply(
                "Vous n'avez pas choisit un royaume valide, voici la liste des royaumes: `Arryn, Baratheon, Greyjoy, Lannister, Martell, Stark, Targaryen, Tyrell`"
            );
        Royaume=royaumesList.indexOf(args[1])
        role=rolesId[royaumesList.indexOf(args[1])] // Récupère l'id du role du royaume
    } else {
        if (!bot.hasRole(message.member.roles.cache, ROLEROI)) message.reply("Vous n'avez pas la permission pour taper cette commande !")
        role = bot.hasRole(message.member.roles.cache, rolesId); // Récupère l'id du role du royaume
        Royaume = royaumesList[rolesId.indexOf(role)]; // Récupère le nom du royaume
    }

    GuildMemberChoisi = message.mentions.members.first(); // On récupère le membre mentionné
    roleVote = bot.hasRole(GuildMemberChoisi.roles.cache, rolesId);  // On cherche son role de royaume

    if (role!=roleVote) return message.reply("Tu dois choisir un joueur qui fait parti de ton royaume !")

    fichier[Royaume].Diplomate = GuildMemberChoisi.id
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
    message.reply(`Tu viens de choisir ${GuildMemberChoisi} comme diplomate`)
    bot.emit("endPhase1")
};

module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.DIPLOMATE;
