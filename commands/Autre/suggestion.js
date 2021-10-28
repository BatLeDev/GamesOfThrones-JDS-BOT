const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args, guildsettings) => {
    args = args.join(' ')
    var channel_suggestion=guildsettings.channel_suggestion.specificChannel.suggest
    if (channel_suggestion=="") return message.reply("Il n'y a pas de salon de suggestion");
    await bot.channels.cache.get(channel_suggestion).send(`💡__**Nouvelle idée**__💡\n${args}\n-----------------------------\n*par **${message.author}**, merci a lui!*`)
    .then(async msg => {
        await msg.react('👍')
        await msg.react('👎')
    });
};

module.exports.help = MESSAGES.COMMANDS.AUTRE.SUGGESTION;