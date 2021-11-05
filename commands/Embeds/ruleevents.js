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
        .setTitle("🎁 __Les évènements__")
        .setDescription(
            `
            Au cours de la partie, plusieurs événements peuvent arriver. ***Il vous est demandé de bien connaître les descriptifs de chaque events.***
            `
        )
        .addField(
            "__**Winter is coming :**__",
            `
            Un froid glacial s’installe à Westeros. Oui, l'hiver arrive. Le mur qui protégeait Westeros est tombé… C’est un désastre! Les Marcheurs Blancs arrivent sur la carte. 
            Pendant plusieurs jours, les marcheurs blancs descendent du Nord pour anéantir l'espèce humaine. Leurs déplacements sont imprévisibles à part le fait qu'ils ne font que descendre sur la carte. Mais ils deviennent de plus en plus puissants au fil des batailles. Le Vert Dragon peut être utilisé contre eux et rend vos armées plus efficaces. Vous pouvez vous alliés ou non avec les autres royaumes, ou faire les pires coups bas… Enfin... à vos risques et périls ! Bon courage !

            `
        )
        .addField(
            "__**De l’or sur les routes :**__",
            `
            Durant **3 jours**, chaque jour 5 routes seront remplis aléatoirement d’Or. L’armée qui passe sur cette route fait gagner au royaume entre **600 et 1000 Gallions** en fonction de l’or qui s’y trouve.  Si vous êtes propriétaire des 2 extrémités de la route, vous remportez également le butin. Les routes d’Or peuvent être marquées ou non sur la carte.

            `
        )
        .addField(
            "__**L’action fait la puissance :**__",
            `
            Durant 2 jours, tous les royaumes recevront **2 pE par armée** en plus.
            `
        )
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    await interaction.channel.send({ embeds: [embed] });
};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULEEVENTS;
