const { MESSAGES } = require("../../utils/constants");
const { ZONEDESC, ROLEJOUEUR } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if (!bot.hasRole(message.member.roles.cache, ROLEJOUEUR)) {
        return await message.reply("Vous n'êtes pas dans la partie! Demmandez avec un MDJ pour rejoindre une partie.")
    }
    // Test si c'est un bon nom de zone
    // Test si elle est libre
    // Test assez d'argent
    // Test si armée présente
    // Moove la zone

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

    const listZones = Object.keys(ZONEDESC); // Récupère la liste des noms de zones 
    if (!listZones.includes(args[0])) { // Test si l'argument est un nom de zone
        return await message.reply(
            "Vous devez choisir un nom de zone valide !"
        );
    }

    // On cherche le royaume
    role = bot.hasRole(message.member.roles.cache, rolesId); // Récupère l'id du role du royaume
    RoyaumeName = royaumesList[rolesId.indexOf(role)]; // Récupère le nom du royaume

    if (fichier[RoyaumeName].Gallions<200) { // Test assez d'argent
        return await message.reply("Vous n'avez pas assez de Gallions !")
    }
    
    // Test la présence d'une armée
    let armeePresence=false // Passe a vrai si une armée est présente sur la zone
    for (let armee of fichier[RoyaumeName].Armies) {
        if (armee.loc==args[0])  {
            armeePresence=true
        }
    }
    if (armeePresence) {
        return await message.reply("Vous devez avoir une armée présente sur la zone pour pouvoir la prendre")
    }

    // Trouve la zone
    zonelibre=false // Passe a vrais si la zone est libre

    // On cherhce dans les zones vites 
    for (let izone in fichier.ZonesVides) {
        if (fichier.ZonesVides[izone].name==args[0]&&zone.pr==0) {
            zonelibre=fichier.ZonesVides[izone] // Récupère l'object de la zone
            fichier.ZonesVides.splice(iZone,1)  // Retire la zone
        }
    }

    // On cherhe dans les zones possédés par des royaumes
    for (let royaume of royaumesList) {
        for (let izone in fichier[royaume].Zones) {
            if (fichier[royaume].Zones[izone].name==args[0]&&zone.pr==0) {
                zonelibre=fichier[royaume].Zones[izone] // Récupère l'object de la zone
                fichier[royaume].Zones.splice(iZone,1) // Retire la zone
            }
        }
    }
    if (zonelibre===false) { // Si la zone n'est pas libre, on affiche une erreure 
        return await message.reply("Cette zone n'est pas libre, ou elle a encore des pR")
    }

    bot.moove(ZONEDESC[zoneobj.name].ChanId, fichier[royaumeName].CategorieId)
    
    fichier[RoyaumeName].Gallions-=200 // On retire le cout de la commande
    fichier[royaumeName].Zones.push(zonelibre);  // On ajoute la zone
    bot.updateStats(Royaume)

    await message.reply(`Vous vennez de prendre la zone ${args[0]}`)
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.TAKE;
