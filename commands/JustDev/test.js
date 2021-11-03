const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot) => {
    //Commande de test, contenu du fichier libre

    bot.updateStats("Arryn")
};

module.exports.help = MESSAGES.COMMANDS.JUSTDEV.TEST;
