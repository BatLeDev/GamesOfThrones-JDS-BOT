const { MESSAGES } = require("../../utils/constants");
const { ROLEMJ, ROLEROI, ANNONCEJEU } = require("../../config");
const fs = require("fs");
 
module.exports.run = async (bot, message, args) => {
    // Verrifier si c'est une commande MJ
        // Récupère le royaume du joueur mentionné
        // Définit le joueur mentionné comme roi
    
    // Verrifier que le joueur voté appartiens à l'equipe de l'auteur
    // Vérifie si un roi est pas déja élu
    // Rajoute/modifie la voie, avec son auteur
    
    royaumesList = [
        "Arryn",
        "Baratheon",
        "Greyjoy",
        "Lannister",
        "Martell",
        "Stark",
        "Targaryen",
        "Tyrell",
    ];
    rolesId = [
        "702823145668739142",
        "702823256578719846",
        "702838713775816734",
        "702822919511867411",
        "702823114320642128",
        "702822841443155988",
        "702822871491149844",
        "702823220331675648",
    ];

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

    if (message.mentions.members.size==0) {
        return await message.reply("Vous devez mentionner un joueur !")
    }

    GuildMemberVote = message.mentions.members.first(); // On récupère le membre mentionné
    roleVote = bot.hasRole(GuildMemberVote.roles.cache, rolesId);  // On cherche son role de royaume
    royaumeVote = royaumesList[rolesId.indexOf(roleVote)]; // On cherche le nom de son royaume

    // Commande MJ
    if (args.length==2) {
        if (args[1]=="force" && bot.hasRole(message.member.roles.cache, ROLEMJ)) { // Si c'est un mj, et que il force le vote
            const ancienRoi=fichier[royaumeVote].Roi //TODO retirer l'ancien roi
            GuildMemberVote.roles.add(ROLEROI)
            fichier[royaumeVote].Roi = GuildMemberVote.id // On save le nouveau roi
            fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier

            await bot.channels.cache.get(ANNONCEJEU).send(`Le joueur <@${GuildMemberVote.id} est le nouveau roi du royaume de ${royaumeVote}! *Mdj, retire le role a l'ancien roi*`)
            return
        }
        // Si il n'a pas les permissions, on affiche rien
    }

    if (fichier.Phase!=1) return message.reply("Il faut être dans la phase 1 pour pouvoir commencer a voter votre roi!") // Si on est pas dans la phase de vote, on skip
    if (typeof fichier[royaumeVote].Roi == "string") return message.reply("Votre roi a déja été élu !")

    GuildMemberMe = message.member; // On récupère le membre
    roleMe = bot.hasRole(GuildMemberMe.roles.cache, rolesId);  // On cherche son role de royaume

    if (roleMe!=roleVote) return message.reply("Tu dois voter un joueur qui fait parti de ton royaume !")

    fichier[royaumeVote].Roi[GuildMemberMe.id]=GuildMemberVote.id // Ajoute dans le fichier qq chose du style Roi:  {"78452":"845"}

    message.reply("Ton vote a bien été comptabilisé!")    
    console.log(`${GuildMemberMe.displayName} à voté pour ${GuildMemberVote.displayName}`)

    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
    bot.emit("endVoteRoi") // Emmet le test de fin de vote
};
 
module.exports.help = MESSAGES.COMMANDS.PREPARATIONS.VOTEROI;