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
        .setTitle("📜 __Les Phases__")
        .addField(
            "Phase 0",
            `
            Les joueurs rejoignent la partie
            `
        )
        .addField(
            "Phase 1",
            `
            Sa durée est de 24h max. A la fin de celui-ci les royaumes devons avoir choisi: le roi, le diplomate, le chef de guerre et la capitale.

            `
        )
        .addField(
            "Phase 2",
            `
            Le jeu commence, toutes les actions du jeu sont possibles durant cette phase. Le premier jour les royaumes reçoivent 800 Gallions et 200 unité de chaque ressources
            Ensuite la production varie en fonction des zones possédé.            
            `
        )
        .addField(
            "Phase 3",
            `
            La phase 3 démarre quand les MJ le décident (quand il reste 2 ou 3 royaume dans la partie). Cette phase dure 2 jours pendant lesquels les productions sont doublées.
            A la fin de ces 2 jours le jeu se termine
            
            `
        )
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    await interaction.channel.send({ embeds: [embed] });

};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULEPHASE;
