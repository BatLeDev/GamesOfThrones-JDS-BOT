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
        .setTitle("🍄 __Marché d'Icar le Gar__")
        .setDescription(
            `Comme dans toute bonne fiction, il y a toujours un endroit où l’on peut acheter des objets, des boosts, de la nourriture, fabriqué de manière inconnue, mais qui fonctionne. C’est donc pour cela que l’on retrouve le **marché d’Icar le Gar** dans notre jeu ! Vous pourrez y acheter plusieurs choses qui ont des effets particuliers...
            `
        )
        .addField(
            "Revers patriarcale de la rage: (1000 Gallions)",
            `*Aller bandes de lâches Avancez! Combattez jusqu'à la mort !*
        \`Les armées ont + 1 pA pendant 1h\`
        \`Les 2 premiers déplacements du jour sont gratuit\`
        `
        )
        .addField(
            "Vers Dragon: (1000 Gallions)",
            `*Ce vers n’est pas de terre… Il est bien plus puissant ! Il vous redonnera de la force pour vos combats !*
            \`Donne + 50 % d’attaque et de défense en plus contre les marcheurs blanc.\`
            `
        )
        .addField(
            "Repas bien chaud: (400 Gallions)",
            `*Pour redonner de l'énergie rapidement à vos troupes, rien de mieux qu’un bon repas chaud!*
            \`Restaure immédiatement 2 pE à l’une de vos armée\`
            `
        )
        .addField(
            "Buffet à volonté: (900 Gallions)",
            `*Rien de tel qu'un buffet pour fêter une conquête victorieuse!*
            \`Restaure tous les pE d’une armée à la fin de la journée.\`
            `
        )
        .addField(
            "Kit de soin: (200 Gallions + surcoûts)",
            `Armée de base: Aucun surcoût
            Armée **A ⇒ 50 Fer**, Armée **AA ⇒ 100 Fer**
            Armée **D ⇒ 50 Bois**, Armée **DD ⇒ 100 Bois**
            Armée **E ⇒ 50 Cuir**, Armée **EE ⇒ 100 Cuir**
            \`Restaure 1 pD à une armée\`
            `
        )
        .addField(
            "Un équipement flambant neuf: (200 Gallions + surcoûts)",
            `Armée de base: Aucun surcoût
            Armée **A ⇒ 150 Fer**, Armée **AA ⇒ 300 Fer**
            Armée **D ⇒ 150 Bois**, Armée **DD ⇒ 300 Bois**
            Armée **E ⇒ 150 Cuir**, Armée **EE ⇒ 300 Cuir**
            \`Restaure 4 pD à une armée\`
            `
        )
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    await interaction.channel.send({ embeds: [embed] });

};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULEMARCHE;
