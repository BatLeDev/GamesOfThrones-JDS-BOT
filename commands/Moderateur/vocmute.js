const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
    const vocal_channel = message.member.voice.channel;
    if (vocal_channel === null)
        return await message
            .reply(
                "Il faut être dans un salon vocal pour taper cette commande !"
            )
            .then(async (msg) => {
                await bot.sleep(15000)
                msg.delete();
            });

    vocal_channel.members.forEach((member) => {
        if (message.author.id != member.id && !message.author.bot) {
            member.voice.setMute(true);
        }
    });

};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.VOCMUTE;
