module.exports = async (bot) => {
    console.log(`Je suis connecté sous le nom de ${bot.user.username}`);
    setInterval(async function() {
        var date = new Date();
        var month = date.getMonth()+1
        var day = date.getDate()
        var heure = date.getHours();
        var minutes = date.getMinutes();

    }, 60000);
}