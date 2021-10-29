module.exports = async (bot, messageReaction, user) => {
    if (user.bot) return;
    const message = messageReaction.message;

    if (messageReaction.partial) {
        await messageReaction.fetch();
        return;
    }
};
