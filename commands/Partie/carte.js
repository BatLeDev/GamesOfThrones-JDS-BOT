const { MESSAGES } = require("../../utils/constants");
const { ZONEDESC } = require("../../config");
const sharp = require("sharp"); // Module de moditication d'image
const fichier = require("../../partieTest.json");

module.exports.run = async (bot, message) => {
    const msgtemp = await message.channel.send("Génération de la carte...");
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

    composites = [];
    for (let Royaume of royaumesList) {
        for (let zone of fichier[Royaume].Zones) {
            composites.push({
                input: `./Images/Blason-${Royaume}.png`,
                left: ZONEDESC[zone].left,
                top: ZONEDESC[zone].top,
            });
        }
        if (fichier[Royaume].Capitale != "") {
            composites.push({
                input: `./Images/Couronne.png`,
                left: ZONEDESC[fichier[Royaume].Capitale].left,
                top: ZONEDESC[fichier[Royaume].Capitale].top - 15,
            });
        }
    }

    composites.push({
        input: "./Images/LayerNames.png",
    });
    await sharp("./Images/carte-vide.jpeg")
        .composite(composites)
        .toBuffer()
        .then((data) =>
            sharp(data).png({ quality: 60 }).resize(1024).toFile("output.png")
        );

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
