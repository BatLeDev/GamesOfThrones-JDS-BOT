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

            await bot.channels.cache.get(ANNONCEJEU).send({
                content: "Carte du jour:",
                files: ["output.png"],
            });
        }
    }, 60000); // Répète la boucle toute les minutes
};
