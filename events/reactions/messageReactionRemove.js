module.exports = async (bot, messageReaction, user) => {
  if (user.bot) return;

  if (messageReaction.partial) {
    await messageReaction.fetch();
    return;
  }
};