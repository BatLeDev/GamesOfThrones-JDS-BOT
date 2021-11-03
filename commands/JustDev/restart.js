const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot) => {
    process.exit(); // Force l'arret du bot
};

module.exports.help = MESSAGES.COMMANDS.JUSTDEV.RESTART;
