const { MESSAGES } = require("../../utils/constants");
const { ROLEJOUEUR } = require("../../config");
const fs = require('fs')

module.exports.run = async (bot, message, args) => {
    if (!bot.hasRole(message.member.roles.cache, ROLEJOUEUR)) {
        return await message.reply("Vous n'êtes pas dans la partie! Demmandez avec un MDJ pour rejoindre une partie.")
    }
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

    let zoneroyaume = []; // La liste des noms de zones du royaume
    for (let zone of fichier[Royaume].Zones) {
        zoneroyaume.push(zone.name);
    }

    if (!zoneroyaume.includes(args[0])) { // Cherche si la zone fait parti du royaume
        return await message.reply(
            `Vous devez choisir une zone de votre royaume !`
        );
    }

    if (fichier[Royaume].Gallions<300) { // Test si assez de gallions
        return await message.reply(`Vous n'avez pas assez de Gallions !`)
    }

    // Compte le nombre d'armée déja rattaché à cette zone
    var compteur=0
    for (let armee of fichier[Royaume].Armies) {
        let zone=armee.name.split('|')[armee.name.length-2]
        if (zone==args[0])  {
            compteur+=1
        }
    }
    if (compteur==2) {
        return await message.reply("Vous avez deja 2 armées rattachés à cette zone")
    }

    div={
        "name":`Div|${args[0]}|${compteur+1}`,
        "loc":args[0],
        "pA":1,
        "pD":2,
        "pE":8
    }

    fichier[Royaume].Armies.push(div) // On ajoute la division a la liste du royaume
    fichier[Royaume].Gallions-=300 // On retire le prix
    bot.updateStats(Royaume) // On actualise les stats du royaume
    await message.reply(`Vous vennez de creer la division ${div.name} ! Cela vous a coûté 300 Gallions.`)
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.SETDIV;
