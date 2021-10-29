const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (isNaN(args))
        return message.reply(`Tu as mal tappé la commande`).then((msg) => {
            msg.delete({ timeout: 15000 });
        }); // Verrifie que l'argumetn est un nombre entier
    await message.channel.bulkDelete(args[0]); // On supprime le nombre de messages
    await message
        .reply(`${args[0]} message(s) ont été suprimé.`)
        .then((msg) => {
            msg.delete({ timeout: 5000 });
        }); // On envoi le message
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.CLEAR;
