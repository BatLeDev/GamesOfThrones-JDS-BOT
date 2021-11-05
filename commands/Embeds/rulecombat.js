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
        .setTitle("⚔ __Les Combats__")
        .setDescription(
            `
            Lorsqu’un armée arrive sur un territoire il y a plusieurs possibilités : 
            - Elle arrive sur une zone vierge sans appartenance: elle peut l’attaquer (retirer ses pR) puis la revendiquer.
            
            - Elle arrive sur une zone Allié: elle a donc aucune action possible
            
            - Elle arrive sur une zone ennemies → deux possibilités : 
            
                - Une armée ennemie est présente sur la zone, cette armée a plusieurs possibilités: l’attaque, la fuite ou le pour parler.
                - Aucune armée ennemie est présente, vous pouvez donc attaquer la zone ennemie (retirer ses pR) et la revendiquer, ou non. Attention une déclaration de guerre automatique se fait lorsque vous attaquez une zone ennemie. 
            
            Une armée est battu lorsque ses pD tombent à 0. A la fin de la phase de combat, les armées ne récupèrent pas leurs pD, ni leur pE.
            `
        )
        .addField(
            "__**L’attaque :**__",
            `
            - Lorsqu’une flotte arrive dans une zone, elle à l’avantage d’attaque grâce à l’effet de surprise, c’est donc la première à attaquer. Si c’est une division, c’est l’armée adverse qui a l’avantage d’attaque.
            - Une attaque est instantanée dès que l’ordre est donné et se déroule tour par tour.
            - L’armée qui subît l’attaque perd autant de pD que l’armée attaquante à de pA.
            - Les attaques ont un cooldown de 10 minutes contre les armées, de 15 minutes contre les zones et 20 minutes contre les capitales.
            - Il est impossible de renforcer une zone, améliorer, soigner ou créer une armée pendant un combat (attaque comme défense).
            `
        )
        .addField(
            "__**La fuite : **__",
            `
            - La fuite est possible pendant une phase de combat. Si les pE de votre armée sont supérieurs à celle de l’armée adverse, vous avez 100% de chance de réussir votre fuite. 50% dans le cas contraire. Si la fuite échoue, vous devez attendre 20 minutes avant de pouvoir en retenter une autre fuite. Pendant cette deuxième tentative vos chances sont divisées /2. 100% = 50%, 50% = 25% de chance de fuire.
            - Si après avoir fui, l’armée ennemie vous suit, les chances de fuir sont encore divisées / 2. Dans le cas le plus extrême, vos chances de fuir peuvent descendre à 12.5%.
            - Vous êtes encore considéré en fuite durant les 2 déplacements qui suivent votre fuite.

            `
        )
        .addField(
            "__**Le pour parler : **__",
            `
            Il n’y a pas de règles précises pour le pour parler, tout simplement une petite trêve que vous pouvez proposer à l’adversaire. Puis à vous de gérer.
            `
        )
        .addField(
            "__**La défense : **__",
            `
            Il est possible de renforcer à l’avance une zone contrôlée, celle-ci se verra alors attribuer un pR. Chaque pR peut encaisser un pA lors d’une attaque. Le maximum est établi à 4 pR par zone. Un assaillant doit d’abord détruire tous les pR pour revendiquer une zone. 

            `
        )
        .setFooter(
            "L'équipe JDS GOT",
            "https://cdn.discordapp.com/icons/702822547124781058/51062f8a20f04e52f1e5c4425d8831e1.png"
        );

    await interaction.channel.send({ embeds: [embed] });
};

module.exports.help = MESSAGES.COMMANDS.EMBEDS.RULECOMBAT;
