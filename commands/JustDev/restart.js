const { MESSAGES } = require("../../utils/constants");
 
module.exports.run = async (bot, message, args) => {
    process.exit();
};
 
module.exports.help = MESSAGES.COMMANDS.JUSTDEV.RESTART;