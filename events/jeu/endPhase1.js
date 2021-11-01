const { ANNONCEJEU } = require("../../config");
const fs = require("fs");

module.exports = async (bot) => {
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
    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    var nbend = 0;
    for (let royaume of royaumesList) {
        if (
            typeof fichier[royaume].Roi == "string" &&
            typeof fichier[royaume].Diplomate == "string" &&
            typeof fichier[royaume].ChefDeGuerre == "string" &&
            typeof fichier[royaume].Capitale == "string"
        ) {
            nbend += 1;
        }
    }

    if (nbend == 8) {
        await bot.channels.cache
            .get(ANNONCEJEU)
            .send(
                "<@&702822785797324871> Tous les rois ont été votés, et ils ont tous choisit leur capitales, leur diplomates, et leur chef de guerre... Cela signifie donc que nous passons à la phase 2!"
            );
        fichier.Phase = 2;
    }
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};
