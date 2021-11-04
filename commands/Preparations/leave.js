const { MESSAGES } = require("../../utils/constants");
const { PREFIX, ROLEMJ } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
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
    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    if (args.length == 1) {
        if (!bot.hasRole(message.member.roles.cache, ROLEMJ))
            return await message.reply(
                `Tu n'as pas la permission de faire cette commande !`
            );
        GuildMember = message.mentions.members.first();
    } else {
        GuildMember = message.member;
    }

    role = bot.hasRole(GuildMember.roles.cache, rolesId);
    if (role == false)
        return await message.reply(
            args.length == 2
                ? `${member} est dans aucun royaume! Faites **${PREFIX}join <royaume> ${member}**`
                : `Vous êtes dans aucun royaume! Faites **${PREFIX}join <royaume>**`
        ); // Verrifie que l'utilisaeur est dans un royaume

    await GuildMember.roles.remove(role); // On retire le role du royaume
    await GuildMember.roles.remove(ROLEJOUEUR); // On ajoute le role joueur 

    royaume = royaumesList[rolesId.indexOf(role)];
    fichier[royaume].Joueurs.splice(
        fichier[royaume].Joueurs.indexOf(GuildMember.id),
        1
    ); // Retire le joueur de notre fichier data
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier

    await message.reply(
        args.length == 2
            ? `${GuildMember.displayName} viens de quitter le royaume de \`${royaume}\``
            : `Vous vennez de quitter le royaume de \`${royaume}\``
    ); // On répond a l'uttilisateur

};

module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.LEAVE;
