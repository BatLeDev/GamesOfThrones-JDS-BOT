const { MessageEmbed } = require("discord.js"); // Importe le constructeur qui fait les embeds
const { MESSAGES } = require("../../utils/constants");
const { PREFIX } = require("../../config.js"); // Importe le préfix
const { readdirSync } = require("fs"); // Module qui permet de lire des fichiers

module.exports.run = (bot, message, args) => {
    const categoryList = ["Moderateur", "Preparations", "Partie", "Autre"]; // La liste de toutes les catégories que l'on veut afficher dans cet ordre dans la commande help
    var help = [];

    if (!args.length) {
        // Si on veut voir la liste de toute les commandes
        const embed = new MessageEmbed()
            .setColor("#00ffdd")
            .setAuthor("Liste des commandes")
            .setDescription(
                `Voici la liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${PREFIX}help <command_name>\`.`
            )
            .setFooter(
                "Made by BatLeDev",
                "https://cdn.discordapp.com/avatars/403589929877372928/f6c3f80cf3b17568cdecae6882421ac6.png"
            );

        for (const category of categoryList) {
            var commands = readdirSync(`./commands/${category}`).filter(
                (files) => files.endsWith(".js")
            );
            for (var i = 0; i < commands.length; i++) {
                var name = bot.commands
                    .filter(
                        (cat) => cat.help.category === category.toLowerCase()
                    )
                    .map((cmd) => cmd.help.name)[i];
                var desc = bot.commands
                    .filter(
                        (cat) => cat.help.category === category.toLowerCase()
                    )
                    .map((cmd) => cmd.help.description)[i];
                help.push(`**${name} - **${desc}`);
            }

            embed.addField(`__**${category}**__`, help.join("\n"));
            help = [];
        }
        return message.channel.send({ embeds: [embed] });
    } else {
        //Si on veut voir l'aide pour une commande en particulier
        const command =
            bot.commands.get(args[0]) ||
            bot.commands.find(
                (cmd) => cmd.help.aliases && cmd.help.aliases.includes(args[0])
            );

        if (!command) return message.reply("Cette commande n'existe pas!");

        const embed = new MessageEmbed()
            .setColor("#00ffdd")
            .setAuthor("Aide sur une commande spécifique")
            .setTitle(`Commande: \`${command.help.name}\``)
            .setDescription(
                `Détail de la commande ${command.help.name}.\nPour voir la liste complète, tapez \`${PREFIX}help\`.\n\`<>\` signifie que l'argument est requis, \`()\` signifie que l'argument est optionnel.`
            )
            .addField("Description", `${command.help.description}`)
            .addField(
                "Utilisation",
                command.help.usage
                    ? `${PREFIX}${command.help.name} ${command.help.usage}`
                    : `${PREFIX}${command.help.name}`,
                true
            )
            .setFooter(
                "Made by BatLeDev",
                "https://cdn.discordapp.com/avatars/403589929877372928/f6c3f80cf3b17568cdecae6882421ac6.png"
            );
        if (command.help.aliases.length > 0) // Si il y a des aliases, on les ajoutes
            embed.addField("Alias", `${command.help.aliases.join(", ")}`, true);

        return message.channel.send({ embeds: [embed] });
    }
};

module.exports.help = MESSAGES.COMMANDS.AUTRE.HELP;
