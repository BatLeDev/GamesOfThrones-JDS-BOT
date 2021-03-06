const { MessageEmbed } = require("discord.js"); // Importe le constructeur qui fait les embeds
const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {

    // Verrifie que c'est un maitre du jeu
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)) { 
        return await interaction.reply({
            content: `Vous devez Γͺtre un Maitre du Jeu pour executer cette commande !`,
            ephemeral: true,
        });
    }

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On rΓ©cupΓ¨re le fichier de la partie

    const embed = new MessageEmbed()
        .setTitle("La partie commence !")
        .setAuthor(
            "Game Of Trones",
            "https://cdn.discordapp.com/attachments/903944289791397888/903944360440242196/images.png"
        )
        .setColor(0x00ae86)
        .setDescription(
            "π­ππππππ π ππππππ ππ π ππππ, ππππππ π ππΜπππππ\n*πΉ'πππππππ πππ π'πΜππππ πππππ πππ !! (avec la commande `>voteroi <@joueur>`)*"
        )
        .setFooter(
            "BatLeDev#0847",
            "https://cdn.discordapp.com/avatars/403589929877372928/f6c3f80cf3b17568cdecae6882421ac6.png"
        );

    for (let royaumeName of bot.config.ROYAUMELIST) {
        strTemp = "";
        for (let id of fichier[royaumeName].Joueurs) {
            strTemp = strTemp + "<@" + id + ">\n";
        }
        if (strTemp != "") embed.addField(`${royaumeName} :`, strTemp);
    }

    fichier.Phase = 1;
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier

    
    await bot.channels.cache.get(bot.config.ANNONCEJEU).send({ embeds: [embed] });

    await interaction.reply({ // On affiche au joueur 
        content: `Vous vennez de lancer la partie !`,
        ephemeral: true,
    });

/*  
    setTimeout(() => {
        Au bout de 24h, on force l'arret des votes du roi
        bot.emit("endVoteRoi", true);
    }, 86400000); 
*/
};

module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.START;
