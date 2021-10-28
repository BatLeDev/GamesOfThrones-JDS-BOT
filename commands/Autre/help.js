const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");
const { readdirSync } = require("fs");

module.exports.run = (bot, message, args, guildsettings) => {    
    const categoryList = ['Admin', 'Autre', 'Lg', 'Moderateur']
    var help = [];

    if (!args.length) {
        const embed = new MessageEmbed()
        .setColor("#00ffdd")
        .setAuthor("Liste des commandes")
        .setDescription(`Voici la liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${guildsettings.prefix}help <command_name>\`.`)
        .setFooter('Made by BatLeDev', 'https://cdn.discordapp.com/avatars/403589929877372928/53c289061a41c9ffcad0b48ae9db60e7.png')

        for (const category of categoryList) {
            var commands = readdirSync(`./commands/${category}`).filter(files => files.endsWith(".js"))
            for (var i = 0; i < commands.length; i++) {
                var name = bot.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name)[i]
                var desc = bot.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.description)[i]
                help.push(`**${name} - **${desc}`)
            }
                
            embed.addField(
                `__**${category}**__`,
                help.join('\n')
            );
            help = []
        };

        return message.channel.send(embed);
    } else {
        const command = bot.commands.get(args[0]) || bot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));

        if (!command) return message.reply("Cette commande n'existe pas!");

        const embed = new MessageEmbed()
        .setColor("#00ffdd")        
        .setAuthor("Aide sur une commande spécifique")
        .setTitle(`Commande: \`${command.help.name}\``)
        .setDescription(`Détail de la commande ${command.help.name}.\nPour voir la liste complète, tapez \`${guildsettings.prefix}help\`.\n\`<>\` signifie que l'argument est requis, \`()\` signifie que l'argument est optionnel.  `)

        .addField("Description", `${command.help.description}`)
        .addField("Utilisation", command.help.usage ? `${guildsettings.prefix}${command.help.name} ${command.help.usage}` : `${guildsettings.prefix}${command.help.name}`, true)
        .setFooter('Made by BatLeDev', 'https://cdn.discordapp.com/avatars/403589929877372928/53c289061a41c9ffcad0b48ae9db60e7.png')
        if (command.help.aliases.length > 0) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);  

        const permission = ["Aucune permission requise", "Staff", "Animateur", "Moderateur", "Gérant", "Administrateur", "Développeur"];

        embed.addField("Permission: ", permission[command.help.perms])
        
        return message.channel.send(embed);
    }
};

module.exports.help = MESSAGES.COMMANDS.AUTRE.HELP;