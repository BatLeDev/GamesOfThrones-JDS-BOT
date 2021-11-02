const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js"); // Importe le constructeur qui fait les embeds

module.exports.run = async (bot, message) => {
    const embed = new MessageEmbed()
        .setColor("001dff")
        .setTitle("♟ __Les armées__")
        .setDescription(
            `N’oublions pas que l’un des buts des royaumes est de conquérir des territoires. Pour cela, il leur faut des armées. Chacune des armées sont fortement rattachées à leur territoire d’origine. Mais attention! Les armées ne supportent pas être plus de 2 rattachés à la même terre natale. Avec le temps, une armée finit par être meilleur dans un domaine et gagner en performance.

            Dans le jeu, les terres natales sont des zones appartenant à des royaumes. Il peut donc y avoir uniquement 2 armées rattachées à la même zone. Il existe 2 types d’armées: Les divisions et les flottes. (Voir <#702922783663063141> pour connaître leur déplacement possibles). \nLes armées peuvent être améliorées et se spécifier dans un domaine: \`A: Meilleur en attaque, D: Meilleur en défense, E: Meilleur en énergie\` Pour pouvoir acheter une nouvelle armée, il faut avoir des **Gallions** et des **Ressources**. \nChacune des armée à des stats: Des points d'attaque **pA**, Des points de défense **pD**, Des points d'énergie **pE**.\nLe nom d'une armée est basé sur ce schéma: [Div/Flo]|[A,D,E,ou...]|[Zone de rattachement]|[1 ou 2].  \`Ex:Flo|DD|Ta2|1\`\n\n
            `
        )
        .addField(
            "__**Achats:**__",
            `Division: \`1 pA / 2 pD / 8pE\` *300 Gallions*
        Flotte: \`1 pA / 2 pD / 6pE\` *100 Gallions + 100 bois + 150 pierre*`
        )
        .addField(
            "__**Amélioration niveau 1: **__",
            `
            Division A: \`2 pA / 2 pD / 8pE\` *200 Gallion + 400 fer*
            Division D: \`1 pA / 4 pD / 8pE\` *200 Gallion + 400 bois*
            Division E: \`1 pA / 3 pD / 10pE\` *200 Gallion + 200 cuir + 200 fer*
            
            Flotte A: \`2 pA / 2 pD / 6pE\` *200 Gallion + 200 bois + 200 pierre*
            Flotte D: \`1 pA / 4 pD / 6pE\` *200 Gallion + 400 bois*
            Flotte E: \`1 pA / 4 pD / 8pE\` *200 Gallion + 200 cuir + 200 fer*
            `
        )
        .addField(
            "__**Amélioration niveau 2: **__",
            `
            Division AA: \`3 pA / 3 pD / 9pE\` *300 Gallion + 450 fer + 450 cuir*
            Division DD: \`2 pA / 6 pD / 9pE\` *300 Gallion + 600 fer*
            Division EE: \`2 pA / 4 pD / 12pE\` *300 Gallion + 600 cuir*
            
            Flotte AA: \`3 pA / 3 pD / 7pE\` *300 Gallion + 450 bois + 450 pierre*
            Flotte DD: \`2 pA / 6 pD / 7pE\` *300 Gallion + 600 pierre*
            Flotte EE: \`2 pA / 4 pD / 10pE\` *300 Gallion + 600 bois*
            `
        )
        .addField(
            "__**Récupération d'énergie: **__",
            `
            Les armées gagnent **2 pE / jour** *sauf:*
            Division E: **4 pE / jour**
            Flotte E: **3 pE / jour**
            Division EE: **12 pE / jour**
            Flotte EE: **8 pE / jour**
            `
        )
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    await message.channel.send({ embeds: [embed] });
};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULEARMEE;
