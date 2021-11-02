const { MESSAGES } = require("../../utils/constants");
const { ZONEDESC } = require("../../config");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.TAKE;
