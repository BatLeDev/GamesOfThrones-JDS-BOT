const { PREFIX } = require('../../config.js');

module.exports = async (bot, message) => {
  if (message.channel.type === "dm") return bot.emit("directMessage", message);
  if (message.author.bot) return;

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length()).split(/ +/);
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
      .then((msg) => {
        msg.delete({ timeout: 10000 });
      });

  const cmdHelp = command.help;

  if (message.author.id != "403589929877372928") {
    if (cmdHelp.args && args.length <= 0) {
      let noArgsReply = `Il nous faut des arguments pour cette commande, ${message.author}!`;
      if (cmdHelp.usage) {
        noArgsReply += `\nVoici comment utiliser la commande: \`${PREFIX}${cmdHelp.name} ${cmdHelp.usage}\``;
        message.reply(noArgsReply).then((msg) => {
          msg.delete({ timeout: 30000 });
        });
        message.delete({ timeout: 30000 });
        return;
      }
    }
  }

  message.delete().catch(console.error);
  command.run(bot, message, args, guildsettings, cmdHelp, usersettings);
};
