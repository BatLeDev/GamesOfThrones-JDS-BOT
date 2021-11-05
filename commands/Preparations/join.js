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
        if (fichier.Phase != 0) { // Si une partie est deja en cour (si un mdj essaye de rejoindre en cour de partie, il doit mettre son pseudo en argument !)
            return message.reply(
                `Une partie est déja en cour, veuillez demmander a un <@&${bot.config.ROLEMJ}> de vous rajouter dans la partie`
            );
        }
        Joueur = interaction.member
    };

    if (bot.hasRole(Joueur.roles.cache, bot.config.ROYAUMEID)) { // Test si le joueur est deja dans un royaume
        return await interaction.reply({ // On affiche au joueur 
            content: Joueur !== null 
                ? `${Joueur} est déjà dans un royaume! Faites **/leave ${Joueur}**`
                : `Vous avez déjà rejoint un royaume! Faites **/leave**`,
            ephemeral: true,
        });
    }

    await Joueur.roles.add(fichier[Royaume].RoleID); // On ajoute le role de royaume
    await Joueur.roles.add(bot.config.ROLEJOUEUR); // On ajoute le role joueur 

    fichier[Royaume].Joueurs.push(Joueur.id); // Ajoute a notre fichier data
    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier

    await interaction.reply({ // On affiche au joueur 
        content: Joueur !== null 
            ? `${Joueur.displayName} viens de rejoindre le royaume de \`${Royaume}\``
            : `Vous vennez de rejoindre le royaume de \`${Royaume}\``,
        ephemeral: false,
    });

};

module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.JOIN;
