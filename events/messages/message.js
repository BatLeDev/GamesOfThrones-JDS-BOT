const { PREFIX } = require("../../config.js");

module.exports = async (bot, message) => {
    if (message.channel.type === "dm")  // Si c'est un message privé, on lance l'event dm
        return bot.emit("directMessage", message);
    if (message.author.bot) return; // Si c'est un message du bot on l'ignore

    if (!message.content.startsWith(PREFIX)) return; // Si le message n'est pas une commande on l'ignore

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLocaleLowerCase();
    const command =
        bot.commands.get(commandName) ||
        bot.commands.find(
            (cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
        );

    if (!command)
        return message
            .reply(
                `Cette commande n'existe pas, pour voir la liste des commandes fait **${PREFIX}help**`
            )
            .then(async (msg) => {
                await bot.sleep(10000)
                msg.delete();
            });

    const cmdHelp = command.help;

    if (cmdHelp.args && args.length <= 0) {
        let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;
        if (cmdHelp.usage) {
            noArgsReply += `\nVoici comment utiliser la commande: \`${PREFIX}${cmdHelp.name} ${cmdHelp.usage}\``;
            message.reply(noArgsReply).then(async (msg) => {
                await bot.sleep(30000)
                msg.delete();
            });
            return;
        }
    }

    command.run(bot, message, args, cmdHelp);
};
