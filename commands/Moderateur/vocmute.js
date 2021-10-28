const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
    const vocal_channel = message.member.voice.channel
    if (vocal_channel === null) return await message.reply('Il faut être dans un salon vocal pour taper cette commande !').then(msg => {msg.delete({timeout: 5000})});
    
    vocal_channel.members.forEach(member => {
        if (message.author.id != member.id && !message.author.bot) {
            member.voice.setMute(true)
        };
    });

    console.log(`All muted by ${message.author.username}`);
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.VOCMUTE;