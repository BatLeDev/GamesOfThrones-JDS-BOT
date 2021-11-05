const { MESSAGES } = require("../../utils/constants");
const fs = require("fs");
const sharp = require("sharp"); // Module de moditication d'image

module.exports.execute = async (bot, interaction) => {
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEJOUEUR)) {
        return await interaction.reply({
            content: `Vous n'êtes pas dans la partie! Demmandez à un <@&${bot.config.ROLEMJ}> pour rejoindre une partie.`,            
		    ephemeral: true,
        })
    };
    
    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie
    composites = []; // La variable qui comprend la liste des images a coller
    for (let Royaume of bot.config.ROYAUMELIST) { // Pour chaque royaume
        for (let zone of fichier[Royaume].Zones) { // Pour chaque zone de chaque royaume
            composites.push({ // On ajoute l'image a la composition
                input: `./Images/Blason-${Royaume}.png`, // Le nom
                left: bot.config.ZONEDESC[zone.name].left, // La localisaiton
                top: bot.config.ZONEDESC[zone.name].top,
            });
        }
        if (fichier[Royaume].Capitale !== null) { // Si la capitale a été définie
            composites.push({
                input: `./Images/Couronne.png`,
                left: bot.config.ZONEDESC[fichier[Royaume].Capitale].left,
                top: bot.config.ZONEDESC[fichier[Royaume].Capitale].top - 15,
            });
        }
    }

    composites.push({ // On ajoute l'image des noms de zones
        input: "./Images/LayerNames.png",
    });

    await sharp("./Images/carte-vide.jpeg") // On génère l'image
        .composite(composites) // On colle toutes les images ensembles
        .toBuffer()
        .then((data) =>
            sharp(data).png({ quality: 60 }).resize(1024).toFile("output.png") // On diminue la qualitée
        );

	interaction.reply({
		files: ["output.png"],
		ephemeral: false,
	})
};


module.exports.help = MESSAGES.COMMANDS.PARTIE.CARTE;