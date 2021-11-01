const { MESSAGES } = require("../../utils/constants");
const { ANNONCEJEU } = require("../../config");

module.exports.run = async (bot, message) => {
    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie
    if (fichier.Phase == 2) {
        await bot.channels.cache
            .get(ANNONCEJEU)
            .send("<@&702822785797324871> La phase 3 commence !");
        fichier.Phase = 3;
    }

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.NEXTPHASE;
