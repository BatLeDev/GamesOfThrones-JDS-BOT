const { MESSAGES } = require("../../utils/constants");
const { ZONEDESC } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
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

    const listZones = Object.keys(ZONEDESC);
    if (!listZones.includes(args[0])) {
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
    let armeePresence=false
    for (let armee of fichier[RoyaumeName].Armies) {
        if (armee.loc==args[0])  {
            armeePresence=true
        }
    }
    if (!armeePresence) {
        return await message.reply("Vous devez avoir une armée présente sur la zone pour pouvoir la prendre")
    }

    // Trouve la zone
    zonelibre=false
    for (let izone in fichier.ZonesVides) {
        if (fichier.ZonesVides[izone].name==args[0]&&zone.pr==0) {
            zonelibre=zone
            fichier.ZonesVides.splice(iZone,1)
        }
    }
    for (let royaume of royaumesList) {
        for (let izone in fichier[royaume].Zones) {
            if (fichier[royaume].Zones[izone].name==args[0]&&zone.pr==0) {
                fichier[royaume].Zones.splice(iZone,1)
            }
        }
    }
    if (zonelibre===false) {
        return await message.reply("Cette zone n'est pas libre, ou elle a encore des pR")
    }

    fichier[royaumeName].Zones.push(zonelibre);

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.TAKE;
