const { MESSAGES } = require("../../utils/constants");
const fs = require('fs')

module.exports.run = async (bot) => {

    // Reset la partie
    const fichierInitial = fs.readFileSync("partieVierge.json"); // On récupère le fichier vierge
    fs.writeFileSync("partieTest.json", fichierInitial); // On reset la nouvelle partie

};

module.exports.help = MESSAGES.COMMANDS.JUSTDEV.RESET;
