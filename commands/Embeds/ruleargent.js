const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js"); // Importe le constructeur qui fait les embeds

module.exports.run = async (bot, message) => {
    const embed = new MessageEmbed()
        .setColor("001dff")
        .setTitle("💰 __Argent & Ressources__")
        .setDescription(
            `
            La base de tout royaume est son système économique. La capitale est la banque générale du royaume. Chaque zone produit des gallions qu’elle donne à la banque. Les ouvriers travaillent dur chaque jour et permettent de collecter **du bois, du cuir, de la pierre, et du fer.**

            C’est pour cela qu’en début de partie, chaque royaume commence avec **1000 Gallions** et **300 unités de chaque ressource.**
            Lorsqu’un royaume conquis la capitale d’un autre royaume, il récupère la **totalité** des Gallions et des ressources.

            `
        )
        .addField(
            "__**Production de Gallions:**__",
            `Chaque jour, le royaume génère 200 Gallions par zone possédée et 300 Gallions grace à la capitale.`
        )
        .addField(
            "__**Production de Ressources: **__",
            `Chaque jour, le royaume produit **du bois, du cuir, de la pierre, et du fer**, par quantité de **150 unités**.            `
        )
        .addField(
            "__**Améliorations de production: **__",
            `
            Le niveau 1 améliore la production à **200 par jours**
            Le niveau 2 améliore la production à **300 par jours**
            
            ***Couts:***
            __Production de pierre 1__: 400 Gallion + 300 cuir
            __Production de pierre 2__: 800 Gallion + 450 cuir
            
            __Production de fer 1__: 400 Gallion + 300 pierre
            __Production de fer 2__: 800 Gallion + 450 pierre
            
            __Production de bois 1__: 400 Gallion + 300 fer
            __Production de bois 2__: 800 Gallion + 450 fer
            
            __Production de cuir 1__: 400 Gallion + 300 bois
            __Production de cuir 2__: 800 Gallion + 450 bois
            `
        )
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    await message.channel.send({ embeds: [embed] });
};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULEARGENT;
