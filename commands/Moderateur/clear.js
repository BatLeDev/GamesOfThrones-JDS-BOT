const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
    if (isNaN(args)) // Affiche une erreure si l'argument n'est pas un nombre
        return message
            .reply(`Tu as mal tappé la commande`)
            .then(async (msg) => {
                await bot.sleep(30000);
                msg.delete();
            }); // Verrifie que l'argumetn est un nombre entier

    try {
        await message.channel.bulkDelete(args[0]); // On supprime le nombre de messages
        await message.channel
            .send(`${args[0]} message(s) ont été suprimé.`)
            .then(async (msg) => {
                await bot.sleep(30000);
                msg.delete();
            }); // On envoi le message
    } catch { // En cas d'erreur (limitation de discord)
        await message
            .reply(
                `Due à la limitation de Discord, je ne peut pas supprimer de messages datant de plus de \`14 jours...\`\nPour clear tout le salon, dupliquez le, puis supprimez celui là !`
            )
            .then(async (msg) => {
                await bot.sleep(30000);
                msg.delete();
            }); // On envoi le message
    }
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.CLEAR;
