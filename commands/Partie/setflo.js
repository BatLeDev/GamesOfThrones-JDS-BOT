const { MESSAGES } = require("../../utils/constants");
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
    //Verrifier que c'est une zone du royaume
    //Verrifier que le royaume a assez de gallions
    //Générer le nom de la zone

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

    if (fichier.Phase!=2)  {
        return await message.reply("Vous devez être dans la phase 2 pour faire spawn des armées")
    }
    
    var role = bot.hasRole(message.member.roles.cache, rolesId); // Récupère l'id du role du royaume
    var Royaume = royaumesList[rolesId.indexOf(role)]; // Récupère le nom du royaume

    let zoneroyaume = []; // La liste des noms de zones
    for (let zone of fichier[Royaume].Zones) {
        zoneroyaume.push(zone.name);
    }

    if (!zoneroyaume.includes(args[0])) {
        return await message.reply(
            `Vous devez choisir une zone de votre royaume !`
        );
    }

    if (fichier[Royaume].Gallions<100||fichier[Royaume].Bois<100||fichier[Royaume].Pierre<150) {
        return await message.reply(`Vous n'avez pas assez de Gallions/Ressources !`)
    }

    var compteur=0
    for (let armee of fichier[Royaume].Armies) {
        let zone=armee.name.split('|')[-2]
        if (zone==args[0])  {
            compteur+=1
        }
    }
    if (compteur==2) {
        return await message.reply("Vous avez deja 2 armées rattachés à cette zone")
    }

    flo={
        "name":`Flo|${args[0]}|${compteur+1}`,
        "loc":args[0],
        "pA":1,
        "pD":2,
        "pE":6
    }

    fichier[Royaume].Armies.push(flo)
    fichier[Royaume].Gallions-=100
    fichier[Royaume].Bois-=100
    fichier[Royaume].Pierre-=150
    bot.updateStats(Royaume)
    await message.reply(`Vous vennez de creer la flotte ${flo.name} ! Cela vous a coûté 100 Gallions, 100 Bois et 150 pierre.`)
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.SETFLO;
