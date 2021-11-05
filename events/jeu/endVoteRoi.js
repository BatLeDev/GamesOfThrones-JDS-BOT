const fs = require("fs");

module.exports = {
	async execute(bot, force=false) {
        let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

        var nbRoi = 0;
    
        //Comptage des votes
        for (let royaume of bot.config.ROYAUMELIST) {
            if (typeof fichier[royaume].Roi == "object") {
                // Cérrifie qu'un roi n'est pas deja voté
                compteurVote = {};
                for (vote of Object.values(fichier[royaume].Roi)) {
                    if (compteurVote[vote] == undefined) compteurVote[vote] = 0;
                    compteurVote[vote] += 1;
                }
    
                newRoi = {}; // Soit 1 joueur, soit plusieurs joueurs a égalité
                for (let [j, v] of Object.entries(compteurVote)) {
                    if (Object.keys(newRoi).length == 0) {
                        // Si newRoi est vide
                        newRoi[j] = v;
                    } else if (v > newRoi[0]) {
                        // Si ce vote est plus élevé que le roi temporaire
                        newRoi = {}; // On reset la liste
                        newRoi[j] = v; // On l'ajoute
                    } else if (v == newRoi[0]) {
                        // Si il y a une égalité
                        newRoi[j] = v; // On ajoute le 2e joueur
                    }
                }
                if (
                    fichier[royaume].Joueurs.length ==
                        Object.keys(fichier[royaume].Roi).length ||
                    forceVote
                ) {
                    // Si tout le monde a voté, ou que c un vote forcé
                    channel = bot.channels.cache.get(bot.config.ANNONCEJEU);
                    if (Object.keys(newRoi).length == 1) {
                        await channel.guild.members.cache
                            .get(Object.keys(newRoi)[0])
                            .roles.add(bot.config.ROLEROI);
                        await channel.send(
                            `Bravo ! <@${
                                Object.keys(newRoi)[0]
                            }> deviens roi de ${royaume} (élus avec la majorité) !`
                        );
                        fichier[royaume].Roi = Object.keys(newRoi)[0];
                    } else if (force) {
                        newRoi =
                            Object.keys(newRoi)[
                                Math.floor(
                                    Math.random() * Object.keys(newRoi).length
                                )
                            ];
                        await channel.guild.members.cache
                            .get(newRoi)
                            .roles.add(bot.config.ROLEROI);
                        await channel.send(
                            `Bravo ! <@${newRoi}> deviens roi de **${royaume}** (élus par le bot, suite à la fin du temps imparti) !`
                        );
                        fichier[royaume].Roi = newRoi;
                    }
                    fs.writeFileSync("partieTest.json", JSON.stringify(fichier)); // On sauvegarde notre fichier
                }
            }
            if (typeof fichier[royaume].Roi == "string") {
                // Si un roi est voté
                nbRoi += 1;
            }
        }
        bot.emit("endPhase1");
    }
}