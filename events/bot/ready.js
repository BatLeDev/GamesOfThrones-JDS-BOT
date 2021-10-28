module.exports = async (bot) => {
    console.log(`Je suis connecté sous le nom de ${bot.user.username}`);
    setInterval(async function() {
        var date = new Date();
        var month = date.getMonth()+1
        var day = date.getDate()
        var heure = date.getHours();
        var minutes = date.getMinutes();

        if(heure === 07 && minutes === 00) {
            const users = await bot.getUserByDate(month,day);
            if (!users) return;
            for (const user of users) {
                await user.guilds.forEach(async guild => {
                    var channelAnnonceId = await bot.getGuild(guild.id)
                    channelAnnonceId=channelAnnonceId.specificChannel.annonce
                    if (channelAnnonceId) {
                        const channelAnnonce = await bot.channels.cache.get(channelAnnonceId);
                        if (channelAnnonce) {
                            await channelAnnonce.send(`Joyeux anniversaire <@${user.userId}>! Passe une bonne journée !`);
                        };
                    }; 
                });
            };
        };
    }, 60000);
}