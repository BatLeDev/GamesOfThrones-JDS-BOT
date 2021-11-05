const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js"); // Importe le constructeur qui fait les embeds

module.exports.execute = async (bot, interaction) => {
    
    if (!bot.hasRole(interaction.member.roles.cache, bot.config.ROLEMJ)) { // Verrifie que c'est un maitre du jou
        return await interaction.reply({
            content: "Tu n'as pas la permission pour executer cette commande.",            
		    ephemeral: true,
        })
    };

    const embed = new MessageEmbed()
        .setColor("001dff")
        .setTitle("♟ __Les armées__")
        .setDescription(
            `
            N’oublions pas que l’un des buts des royaumes est de conquérir des territoires. Pour cela, il leur faut des armées. Chacune des armées sont fortement rattachées à leur territoire d’origine. Mais attention! Les armées ne supportent pas être plus de 2 rattachés à la même  terre natale.

            Dans le jeu, les terres natales sont des zones appartenant à des royaumes. Il peut donc y avoir uniquement **2 armées rattachées à la même zone.**
            Il existe **2 types d’armées: Les divisions et les flottes. **
            **Les divisions peuvent uniquement emprunter des routes terrestres** contrairement aux **flottes qui peuvent emprunter les routes terrestres comme maritimes** (Voir <#702922783663063141> pour connaître leur déplacement possibles). 
            Les armées peuvent être améliorées et se spécifier dans un domaine. Pour pouvoir acheter une nouvelle armée, il faut avoir des **Gallions** et des **Ressources**.
            
            **Toutes les armées ont des points de compétences:**
            - **Les points d’attaque (pA)**, correspondent aux dégâts que l’armée inflige par tour à une autre armée.
            - **Les points défensifs (pD)**, correspondent aux dégâts encaisable par l’armée au total. Il se consume à chaque fois qu’elle subit des dégâts. Ils peuvent être restaurés avec des consommables et des objets.
            - **Les points d’énergie (pE)**, correspondent au point nécessaire de multiples actions
            
            Les armées peuvent se spécifier dans un domaine au choix, **A, D ou E**, qui leur donne plus de points de compétences dans le domaine choisi. Une lettre signifie le niveau 1, 2 lettres signifient que l’armée est au niveau 2.
            Dès qu'un royaume choisit sa capitale, il se voit obtenir gratuitement 2 divisions rattachées à leur capitale.
            Le nom d’une armée est composée ainsi:
            **Div ou Flo | Spécification | Zone de rattachement | 1 ou 2**
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

    await interaction.channel.send({ embeds: [embed] });
};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULEARMEE;
