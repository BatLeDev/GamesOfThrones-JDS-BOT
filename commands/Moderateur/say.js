const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
    await message.channel.send(args.join(' '));
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.SAY;