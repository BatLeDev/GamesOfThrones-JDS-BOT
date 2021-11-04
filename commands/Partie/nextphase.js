const { MESSAGES } = require("../../utils/constants");
const { ANNONCEJEU, ROLEMJ } = require("../../config");

module.exports.run = async (bot, message) => {
    if (!bot.hasRole(message.member.roles.cache, ROLEMJ)) { // Test si c'est un modérateur
        return await message.reply("Vous n'avez pas la permission pour faire cette commande !")
    }

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie
    if (fichier.Phase == 1) { // Annonce le passage a la phase 3
        await bot.channels.cache
            .get(ANNONCEJEU)
            .send("<@&702822785797324871> La phase 2 commence !");
        fichier.Phase = 2;
    }

    if (fichier.Phase == 2) { // Annonce le passage a la phase 3
        await bot.channels.cache
            .get(ANNONCEJEU)
            .send("<@&702822785797324871> La phase 3 commence !");
        fichier.Phase = 3;
    }

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.NEXTPHASE;
