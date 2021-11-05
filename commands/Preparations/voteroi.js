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

    const GuildMemberVote = interaction.options.getMember("joueur"); // On récupère le membre choisit
    const VoteForce = interaction.options.getBoolean("force"); // On récupère le membre choisit
    const RoleVote = bot.hasRole(GuildMemberVote.roles.cache, bot.config.ROYAUMEID);  // On cherche son role de royaume
    const RoyaumeVote = bot.config.ROYAUMELIST[bot.config.ROYAUMEID.indexOf(RoleVote)]; // On cherche le nom de son royaume

    // Verrifie si c'est un maitre du jeu
    if (bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)&&VoteForce) { 

        const lastRoiId=fichier[RoyaumeVote].Roi // On récupère l'id de l'ancien roi
        const GuildMemberLastRoi=interaction.guild.members.cache.get(lastRoiId); // On trouve le guildmember de l'ancien roi
        GuildMemberLastRoi.roles.remove(bot.config.ROLEROI) // On retire le role roi

        GuildMemberVote.roles.add(bot.config.ROLEROI) // On ajoute au joueur choisit le role roi
        fichier[RoyaumeVote].Roi = GuildMemberVote.id // On save le nouveau roi

        await bot.channels.cache.get(bot.config.ANNONCEJEU).send(`Le joueur <@${GuildMemberVote.id} est le nouveau roi du royaume de ${RoyaumeVote}!`)
        await interaction.reply({ // On affiche au joueur 
            content: `Vous vennez d'ajouter le roi manuellement`,
            ephemeral: true,
        });

        fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
        return;
    }

    if (fichier.Phase!=1) { // Si on est pas dans la bonne phase
        return await interaction.reply({ 
            content: `Il faut être dans la phase 1 pour pouvoir commencer a voter votre roi !`,
            ephemeral: true,
        });
    }

    if (typeof fichier[RoyaumeVote].Roi == "string") { // Si le roi est déja voté
        return await interaction.reply({ 
            content: `Votre roi a déjà été élu !`,
            ephemeral: true,
        });
    }

    const GuildMemberMe = interaction.member; // On récupère le membre
    const RoleMe = bot.hasRole(GuildMemberMe.roles.cache, bot.config.ROYAUMEID);  // On cherche son role de royaume

    if (RoleMe!=RoleVote) {
        return await interaction.reply({ // On affiche au joueur 
            content: `Tu dois voter un joueur qui fait parti de ton royaume !`,
            ephemeral: true,
        });
    }

    fichier[RoyaumeVote].Roi[GuildMemberMe.id]=GuildMemberVote.id // Ajoute dans le fichier qq chose du style Roi:  {"idVoteur":"idVoté"}

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
    bot.emit("endVoteRoi") // Emmet le test de fin de vote

    await interaction.reply({ // On affiche au joueur 
        content: `Ton vote a bien été comptabilisé !`,
        ephemeral: true,
    });
};

module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.VOTEROI;
