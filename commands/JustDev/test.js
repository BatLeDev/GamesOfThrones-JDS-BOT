const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot) => {
    //Commande de test, contenu du fichier libre

    const channel = await bot.channels.cache.get("839206733766852608")

    const nbChannelsInCatParent =  await bot.channels.cache.get("702838533785911316").children.size
    console.log(nbChannelsInCatParent)
    
    await channel.setParent("702838533785911316")
    await channel.setPosition(nbChannelsInCatParent-1)
    // Deplacer le channel aà position + children-1
};

module.exports.help = MESSAGES.COMMANDS.JUSTDEV.TEST;
