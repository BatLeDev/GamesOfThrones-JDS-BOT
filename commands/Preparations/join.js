const { MESSAGES } = require("../../utils/constants");
const { PREFIX, ROLEMJ, ROLEJOUEUR } = require("../../config");
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

    if (fichier.Phase != 0)
        return message.reply(
            "Une partie est déja en cour, veuillez demmander a un <@&702822606696349776> de vous rajouter dans la partie"
        );

    if (args.length == 2) {
        if (!bot.hasRole(message.member.roles.cache, ROLEMJ))
            return await message.reply(
                `Tu ne peut utiliser qu'un seul argument !`
            );
        GuildMember = message.mentions.members.first();
    } else {
        GuildMember = message.member;
    }
    if (!royaumesList.includes(args[0]))
        return await message.reply(
            "Vous n'avez pas choisit un royaume valide, voici la liste des royaumes: `Arryn, Baratheon, Greyjoy, Lannister, Martell, Stark, Targaryen, Tyrell`"
        );

    if (bot.hasRole(GuildMember.roles.cache, rolesId)) {
        await message.reply(
            args.length == 2
                ? `${member} est déjà dans un royaume! Faites **${PREFIX}leave ${member}**`
                : `Vous avez déjà rejoins un royaume! Faites **${PREFIX}leave**`
        ); // Verrifie que l'utilisaeur n'est pas deja dans un royaume
        return;
    }
    await GuildMember.roles.add(fichier[args[0]].RoleID); // On ajoute le role de royaume
    await GuildMember.roles.add(ROLEJOUEUR); // On ajoute le role joueur 

    fichier[args[0]].Joueurs.push(GuildMember.id); // Ajoute a notre fichier data
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier

    await message.reply(
        args.length == 2
            ? `${GuildMember.displayName} viens de rejoindre le royaume de \`${args[0]}\``
            : `Vous vennez de rejoindre le royaume de \`${args[0]}\``
    ); // On répond a l'uttilisateur

};

module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.JOIN;
