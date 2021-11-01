const { ANNONCEJEU, ZONEDESC } = require("../../config");
const sharp = require("sharp"); // Module de moditication d'image
const fichier = require("../../partieTest.json");

module.exports = async (bot) => {
    console.log(`Je suis connecté sous le nom de ${bot.user.username}`);
    setInterval(async function () {        
        // Mettre ici les fonctions qui doivent s'executer en continu
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var heure = date.getHours();
        var minutes = date.getMinutes();

        if ( heure==8 && minutes==00) {
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
                    sharp(data)
                        .png({ quality: 60 })
                        .resize(1024)
                        .toFile("output.png")
                );

            await bot.channels.cache.get(ANNONCEJEU).send("Carte du jour: ", {
                files: ["output.png"],
            });
        }
    }, 60000); // Répète la boucle toute les minutes
};
