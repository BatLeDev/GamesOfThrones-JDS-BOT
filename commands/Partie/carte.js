const { MESSAGES } = require("../../utils/constants");
const { ZONEDESC, ROLEJOUEUR, ROLEMJ } = require("../../config");
const sharp = require("sharp"); // Module de moditication d'image
const fs = require("fs");

module.exports.run = async (bot, message) => {
    if (!bot.hasRole(message.member.roles.cache, ROLEJOUEUR)) {
        return await message.reply(`Vous n'êtes pas dans la partie! Demmandez à un <@&${ROLEMJ} pour rejoindre une partie.`)
    }

    const msgtemp = await message.channel.send("Génération de la carte..."); // Affiche un message temporaire durant la génération de la carte
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

    let fichier = JSON.parse(fs.readFileSync("partieTest.json")); // On récupère le fichier de la partie
    composites = []; // La variable qui comprend la liste des images a coller
    for (let Royaume of royaumesList) { // Pour chaque royaume
        for (let zone of fichier[Royaume].Zones) { // Pour chaque zone de chaque royaume
            composites.push({ // On ajoute l'image a la composition
                input: `./Images/Blason-${Royaume}.png`, // Le nom
                left: ZONEDESC[zone.name].left, // La localisaiton
                top: ZONEDESC[zone.name].top,
            });
        }
        if (fichier[Royaume].Capitale !== null) { // Si la capitale a été définie
            composites.push({
                input: `./Images/Couronne.png`,
                left: ZONEDESC[fichier[Royaume].Capitale].left,
                top: ZONEDESC[fichier[Royaume].Capitale].top - 15,
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

    // On envoi l'image
    await message.channel
        .send({
            files: ["output.png"],
        })
        .then(async (msg) => {
            bot.sleep(10000);
            msgtemp.delete();
        });
};

module.exports.help = MESSAGES.COMMANDS.PARTIE.CARTE;
