const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js"); // Importe le constructeur qui fait les embeds

module.exports.run = async (bot, message) => {
    const embed1 = new MessageEmbed()
        .setColor("001dff")
        .setTitle("🏰 __Les Royaumes__")
        .setDescription(
            "En début de partie, **8 équipes** formant **8 royaumes** vont s'affronter. \n Chaque royaume possède un blason qui lui permet de se repérer son empire sur la carte.\nUn royaume est constitué de **4 à 6 joueurs**. Lors du début de la partie, chaque royaume devra élire un roi, qui ensuite choisira une capitale, un diplomate et un chef de guerre."
        )
        .addField(
            "__Voici le nom des 8 royaumes:__",
            "- Arryn\n- Barathéon\n- Greyjoy\n- Lannister\n- Martell\n- Stark\n- Targaryen\n- Tyrell\n\n⬇️ Et maintenant, une petite description de chaque royaume ⬇️\n||Sources : [LaGardeDeNuit.com](https://www.lagardedenuit.com/wiki), [GameOfThronesWiki](https://gameofthrones.fandom.com/fr/wiki/)||"
        )
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    const embed2 = new MessageEmbed()
        .setColor("008cff")
        .setTitle("Arryn :")
        .setDescription(
            `La maison **Arryn** est l'une des grandes maisons de Westeros. Ils règnent sur la vaste région du Val d'Arryn depuis leur siège des Eyrié, un château situé dans les Montagnes de la Lune.\n*Devise : "Aussi haute qu'Honneur"*\n*Le blason représente un faucon qui vole au dessus de la lune.*`
        )
        .setThumbnail("https://i.imgur.com/eHApcha.png");

    const embed3 = new MessageEmbed()
        .setColor("#F7BD16")
        .setTitle("Barathéon :")
        .setDescription(
            `Elle fait partie des plus grandes maisons de Westeros. Elle s'étend depuis les Terre de l'orage, jusqu'à Port Réal. Elle règne sur ce territoire depuis très longtemps et rares sont les familles qui peuvent en dire autant !\n*Devise : "Nous somme furie"*`
        )
        .setThumbnail("https://i.imgur.com/Op819Tb.png");

    const embed4 = new MessageEmbed()
        .setColor("#d68f44")
        .setTitle("Greyjoy :")
        .setDescription(
            `La maison **Greyjoy** règne sur les Îles de Fer, un ensemble d'îles rocheuses réputées pour des constructions navales. La Maison est formée de marins qui naviguent sur les mers et aiment les explorer. Ils honorent les traditions Fer-nés.\n*Devise : "Nous n’ensemençons pas"*\n*Leur blason représente un Kraken*`
        )
        .setThumbnail("https://i.imgur.com/ASJqLkR.png");

    const embed5 = new MessageEmbed()
        .setColor("#E02E30")
        .setTitle("Lannister :")
        .setDescription(
            `Lannister synonyme de puissance, fourberie et cruauté, cette maison n'en est pas des moindres puisque c'est la famille la plus vicieuse ! Cersey Lannister veut le trône à tout prix, et elle est capable de tortures et des manigances les plus inimaginables.\n*Devise : "Entend mon rugissement"*`
        )
        .setThumbnail("https://i.imgur.com/TY75mfB.png");

    const embed6 = new MessageEmbed()
        .setColor("fc9f00")
        .setTitle("Martell :")
        .setDescription(
            `La maison **Martell** régnait sur la vaste région de Dorne depuis leur siège, Lancehélion. Il y a près de 700 ans, alors que leurs guerriers avaient été annihilés avec les Valyriens, la reine Nymeria a fuit avec le Rhoynar. Elle a trouvé une terre d'accueil, région de Dorne, et s'est mariée avec Mors Martell, combinant ainsi leurs bannières.\n*Devise : "Insoumis, invaincus, intacts"*`
        )
        .setThumbnail("https://i.imgur.com/NYlXLJB.png");

    const embed7 = new MessageEmbed()
        .setColor("b7b7b7")
        .setTitle("Stark :")
        .setDescription(
            `La maison des **Stark** fait également partie des plus grandes maisons de Westeros. Fondée par Brandon le batisseur, cette famille vit dans le nord depuis toujours et défend Westeros des attaques de marcheurs blanc.\n*Devise : "L'hiver arrive"*`
        )
        .setThumbnail("https://i.imgur.com/6AH3ZuA.png");

    const embed8 = new MessageEmbed()
        .setColor("963a3a")
        .setTitle("Targaryen :")
        .setDescription(
            `Autrefois c'était la famille la plus puissante de Westeros, et bien qu'elle ne le soit plus elle reste cependant redoutable et compte bien retrouver sa place. A la mort de son empereur, sa fille Daenerys Targaryen s'est exilée sur Essos. Mais elle est revenue plus forte pour reprendre le trône qui lui revenait de droit.\n*Devise : "Feu et Sang"*`
        )
        .setThumbnail("https://i.imgur.com/YRgNUJg.png");

    const embed9 = new MessageEmbed()
        .setColor("48a521")
        .setTitle("Tyrell :")
        .setDescription(
            `La famille **Tyrell** régnait sur la vaste région du Bief depuis leur siège, Hautjardin, un château situé sur les rives du fleuve Mander.\n*Devise : "Devenir toujours plus fort"*\n*Leur blason représente une rose*`
        )
        .setThumbnail("https://i.imgur.com/fhXqneA.png")
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    await message.channel.send({
        embeds: [
            embed1,
            embed2,
            embed3,
            embed4,
            embed5,
            embed6,
            embed7,
            embed8,
            embed9,
        ],
    });
};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULEROYAUMES;
