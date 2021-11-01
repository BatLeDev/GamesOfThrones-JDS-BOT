const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js"); // Importe le constructeur qui fait les embeds

module.exports.run = async (bot, message) => {
    const embed = new MessageEmbed()
        .setColor("001dff")
        .setTitle("🗺 __La carte__")
        .setDescription(
            `Un peu d’histoire… La carte de Westeros et d'Essos est habitée par les 8 royaumes présentés dans la rubrique précédente. Elle fait lieu de multiples combats, où les royaumes s’arrachent les territoires. Vous pouvez apercevoir le mur construit par les Starks au nord de la carte. Le Trône de fer est l’axe le plus important de la carte car c’est un point à la fois puissant économiquement, extrêmement stratégique, mais surtout très mythique. Le Trône se trouve à Port-Réal.

            En jeu, cette carte est très utile pour visualiser la partie. Elle sera actualisée automatiquement tous les matins dans le salon carte du jour. Vous pourrez également l’afficher en tapant la commande \`>carte\`.
            
            __***Fond de carte créé par @wawa👑#8355 Merci énormément !***__

            ⬇️ Ci dessous la légende: ⬇️
            `
        )
        .addField("Texte jaune", "Ce sont les noms des différentes zones.")
        .addField(
            "Les blasons",
            "Ils correspondent aux zones possédés par les différents royaumes. Les zones sans blason sont des zones libres."
        )
        .addField(
            "Les couronnes",
            "Elles représentent les capitales de chaque royaumes."
        )
        .addField(
            "Les traits marrons",
            "Ils représentent les routes praticables par des divisions ou des flottes, permettant de rejoindre 2 zones."
        )
        .addField(
            "Les traits bleus",
            "Ils représentent les voies maritimes uniquement praticables par des flottes."
        )
        .addField(
            "Le trône de fer",
            "La zone la plus importante de la carte. Vous verrez son utilité un peu plus loin dans les règles."
        )
        .addField(
            "*Cas particulier*",
            "A partir de la phase 4, l'évènement **marcheurs blanc** peut se délcencher. Ils apparaissent alors au nord de la carte en direction du sud, par des tunnels souterrains. Leurs déplacements sont donc invisibles."
        )
        //.setImage("https://i.imgur.com/hVIo90U.png")
        .setThumbnail("https://i.imgur.com/hVIo90U.png")
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    await message.channel.send({ embeds: [embed] });
    await message.channel.send({content: "Exemple d'une carte: ", files: ["./Images/exempleCarte.png"]})
};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULECARTE;
