const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
    message.channel.send('🏓 Pinging ...')
    .then(msg => {
        time = Math.floor(msg.createdAt - message.createdAt)
        msg.edit(`🏓 Pong!
        Latence du bot: ${time}ms
        Latence de l'API: ${Math.round(bot.ws.ping)}ms
        `)
        console.log(`Le membre ${message.author.username} a effectué un ping. Résultat: ${time}ms`)
    })
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.PING;