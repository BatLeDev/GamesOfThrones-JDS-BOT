const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args, guildsettings) => {
    if(isNaN(args)) return message.reply(`Tu as mal tappé la commande`).then(msg => {msg.delete({timeout: 15000})});
    await message.channel.bulkDelete(args[0])
    await message.channel.send(`${args[0]} message(s) ont été suprimé.`).then(msg => {msg.delete({timeout: 5000})});

    const embed_clear = new MessageEmbed()
        .setAuthor("Logs Command Admin")
        .setColor('#ffa500')
        .setTitle('Clear effectué')
        .addField('__Nb de messages :__', '`' +  args + '`', true)
        .addField('__Effectué par :__', '`' +  message.author.username + '`', true)
        .addField('__Channel clear :__', '`' +  message.channel.name + '`', true);

    var channel_log=guildsettings.specificChannel.logBot
    if (channel_log) await bot.channels.cache.get(channel_log).send(embed_clear);
        
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.CLEAR;