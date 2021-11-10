const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEJOUEUR)) {
        return await interaction.reply({
            content: `Vous n'êtes pas dans la partie! Demmandez à un <@&${bot.config.ROLEMJ}> pour rejoindre une partie.`,            
		    ephemeral: true,
        })
    };

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie
    let resRoyaume = interaction.options.getString("royaume")
    let armee = interaction.options.getString("armee") // On récupère le nom de l'armée

    // Trouve le royaume
    let royaume=""
    if (resRoyaume&&bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)) { // Si c'est un maitre du jeu, et qu'il a tapé un nom de royaume
        royaume = resRoyaume // Alors royaume == le royaume donné par le mdj

    } else { // Si c'est un joueur normal
        let role = bot.hasRole(interaction.member.roles.cache, bot.config.ROYAUMEID); // Récupère l'id du role du royaume, a partir de la liste de ses roles, et de la liste des roles de royaumes
        royaume = royaumesList[ROYAUMEID.indexOf(role)]; // Récupère le nom du royaume a partir de l'id du role
    }

    for (let iarmee in fichier[royaume].Armies) { // Pour chaque armée du royaume
        if (fichier[royaume].Armies[iarmee].name==armee)  {  // On compare le nom de l'armée do ruyaume, arvec le nom donné
            fichier[royaume].Armies.splice(iarmee,1) // On suprime l'armée    
            fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
            bot.updateStats(royaume) // Actualise le salon des stats   
            await interaction.reply({ 
                content:`Votre armée ${args[0]} à bien été supprimée !`,
                ephemeral: false,
            })
            return // On return car ça y est on a supprimé une armée
        }
    }

	interaction.reply({ // Si aucune armée n'est suprimée
		content: 'Vous devez choisir une armée existante !',
		ephemeral: true,
	})
};


module.exports.help = MESSAGES.COMMANDS.PARTIE.ERASE;