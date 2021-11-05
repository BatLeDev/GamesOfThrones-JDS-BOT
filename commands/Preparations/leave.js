const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");

module.exports.execute = async (bot, interaction) => {
    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    const Royaume = interaction.options.getString("royaume"); // Récupère le royaume
    var Joueur = null;

    if (bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)) { // Si c'est un maitre du jeu
        Joueur = interaction.options.getMember("joueur");
    };

    if (!Joueur) { // Si c'est pas un modérateur
        Joueur = interaction.member
    };

    const Role = bot.hasRole(Joueur.roles.cache, bot.config.ROYAUMEID) // Récupère le role

    if (!Role) { // Si on trouve pas de role de royaume
        return await interaction.reply({ // On lui dit
            content: Joueur !== null 
                ? `${Joueur} est dans aucun royaume! Faites **/join <royaume> ${Joueur}**`
                : `Vous êtes dans aucun royaume! Faites **/join <royaume>**`,
            ephemeral: true,
        });
    }

    await Joueur.roles.remove(Role); // On retire le role de royaume
    await Joueur.roles.remove(bot.config.ROLEJOUEUR); // On retire le role joueur 

    // Retire a notre fichier data
    fichier[Royaume].Joueurs.splice(
        fichier[Royaume].Joueurs.indexOf(Joueur.id),
        1
    );

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier

    await interaction.reply({ // On affiche au joueur 
        content: Joueur !== null 
            ? `${Joueur.displayName} viens de quitter le royaume de \`${Royaume}\``
            : `Vous vennez de quitter le royaume de \`${Royaume}\``,
        ephemeral: false,
    });

};

module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.LEAVE;
