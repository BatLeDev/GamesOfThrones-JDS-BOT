const { MessageEmbed } = require("discord.js"); // Importe le constructeur qui fait les embeds
const fs = require('fs');

module.exports = (bot) => {
    bot.randomize = (tab) => {
        //C'est pour mélanger un tableau
        for (let pas = 0; pas < 5; pas++) {
            var i, j, tmp;
            for (i = tab.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                tmp = tab[i];
                tab[i] = tab[j];
                tab[j] = tmp;
            }
        }
        return tab;
    };

    bot.sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    bot.hasRole = (rolesCache, rolesId) => {
        if (typeof rolesId == "string") {
            for (let role of rolesCache) {
                if (role[0] == rolesId) {
                    return true;
                }
            }
        } else {
            for (let role of rolesCache) {
                for (let role2 of rolesId) {
                    if (role[0] == role2) {
                        return role[0];
                    }
                }
            }
        }
        return false;
    };

    bot.moovezone = async (channelId, categorieId) => { 
        const channel = await bot.channels.cache.get(channelId) // On récupère le channel

        const nbChannelsInCatParent =  await bot.channels.cache.get(categorieId).children.size // On récupère la taille de la catégorie parent 
        
        await channel.setParent(categorieId) // On le deplace de catégorie
        await channel.setPosition(nbChannelsInCatParent-1) // On le déplace à la bonne position dans la catégorie
    }

    bot.updateStats = async (royaumeName) => {
        let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie

        if (typeof fichier[royaumeName] !== "object") {
            return console.error("Le royaume n'a pas été trouvé !")
        }

        const ressourcesList = ["Pierre", "Bois", "Fer", "Cuir"]
        let Ameliorations=[]
        for (let res of ressourcesList) {
            let nb=fichier[royaumeName].Production[res]
            if (nb==200) {
                Ameliorations.push(`Amélioration de ${res} I`)
            }
            if (nb==300) {
                Ameliorations.push(`Amélioration de ${res} II`)
            }
        }

        let Armees = []
        for (let armee of fichier[royaumeName].Armies) {
            Armees.push(`Nom: **${armee.name}**  Stats: **${armee.pA}pA, ${armee.pD}pD, ${armee.pE}pE**  Lieu: **${armee.loc}**`)
        }

        const embed =  new MessageEmbed()
        .setColor("#00ffdd")
        .setTitle(`𝕾𝖙𝖆𝖙𝖎𝖘𝖙𝖎𝖖𝖚𝖊𝖘 ${royaumeName}`)
        .addField(`Stats généraux`, `
        > Roi : ${typeof fichier[royaumeName].Roi=="string"?`<@${fichier[royaumeName].Roi}>`:"N'est pas encore choisi"}
        > Capitale : ${fichier[royaumeName].Capitale!==null?fichier[royaumeName].Capitale:"N'est pas encore choisie"}
        > Nombre de zone : ${fichier[royaumeName].Zones.length}
        > Diplomate : ${fichier[royaumeName].Diplomate!==null?`<@${fichier[royaumeName].Diplomate}>`:"N'est pas encore choisi"}
        > Chef de guerre : ${fichier[royaumeName].ChefDeGuerre!==null?`<@${fichier[royaumeName].ChefDeGuerre}>`:"N'est pas encore choisi"}
        `)
        .addField(`Argent et Ressources possédés`, `
        > Gallions : ${fichier[royaumeName].Gallions}
        > Pierre : ${fichier[royaumeName].Pierre}
        > Bois : ${fichier[royaumeName].Bois}
        > Fer : ${fichier[royaumeName].Fer}
        > Cuir : ${fichier[royaumeName].Cuir}
        `)
        .addField(`Production quotidienne`, `
        > Production de Pierre : ${fichier[royaumeName].Production.Pierre}
        > Production de Bois : ${fichier[royaumeName].Production.Bois}
        > Production de Fer : ${fichier[royaumeName].Production.Fer}
        > Production de Cuir : ${fichier[royaumeName].Production.Cuir}
        `)
        .addField(`Améliorations`, Ameliorations.join("\n")==""?"Vous n'avez pas encore d'améliorations":Ameliorations.join("\n"))
        .addField(`Armées (Nom) (Stats) (Lieu)`, Armees.join("\n")==""?"Vous n'avez pas encore d'armées":Armees.join("\n"))        
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        )
        .setTimestamp();

        await bot.channels.cache.get(fichier[royaumeName].ChannelStats).bulkDelete(1) // On supprime les anciens stats
        await bot.channels.cache.get(fichier[royaumeName].ChannelStats).send({ embeds: [embed] })
    }

};
