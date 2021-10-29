const { MESSAGES } = require("../../utils/constants");
const { PREFIX } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms"); // Pour convertir une durée en milliseconde (ex: "1d" -> 86400000)

module.exports.run = async (bot, message, args, cmdHelp) => {
    const msg_err = `Tu a mal tapé la commande !\nVoici comment utiliser la commande: \`${PREFIX}${cmdHelp.name} ${cmdHelp.usage}\``;

    /**
     * Exemple de commandes:
     * {PREFIX}poll "Quel jour de la semaine vous préférez ?" "Lundi, Mardi,.."
     * {PREFIX}poll "Quel jour de la semaine vous préférez ?" "Lundi, Mardi,.." 1h
     */

    args = args.join(" "); // On recolle tous les arguments en 1 seul.
    if (!args.includes('"'))
        // Si il n'y a pas de question
        return message.reply(msg_err).then((msg) => {
            msg.delete({ timeout: 15000 });
        }); // On affiche l'erreur

    args = args.split('"'); // On separe la question des réponses
    args.splice(0, 1);
    args.splice(1, 1);

    if (args.length < 2 || args.length > 3)
        //On regarde si il y a tous les arguments nécéssaires (1 question, 1 liste de choix, et (otpionnel) 1 délai)
        return message.reply(msg_err).then((msg) => {
            msg.delete({ timeout: 15000 });
        });

    var question = args[0];
    var options = args[1];

    if (args[2] && !args[2] == "") {
        // Si il y a un délai non vide
        var time = args[2];
        time = time.trim(); // Trim supprime les espaces en début et fin de string
    } else args.splice(2, 1);

    var optionsList = options.split(",");

    if (optionsList < 1)
        return message.reply(msg_err).then((msg) => {
            msg.delete({ timeout: 15000 });
        });

    var emojiList = [
        "1️⃣",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
        "8️⃣",
        "9️⃣",
        "🔟",
    ];

    var optionsText = "";
    for (var i = 0; i < optionsList.length; i++) {
        optionsText += emojiList[i] + " " + optionsList[i] + "\n";
    }

    var embed = new MessageEmbed()
        .setTitle(question)
        .setDescription(optionsText)
        .setAuthor(
            `Sondage de ${message.author.username}`,
            message.author.displayAvatarURL
        )
        .setColor("#dbc900")
        .setFooter(
            "Made by BatLeDev",
            "https://cdn.discordapp.com/avatars/403589929877372928/f6c3f80cf3b17568cdecae6882421ac6.png"
        );

    if (time) {
        // Si il y a une durée, on l'ajoute a l'embed
        embed.addField("Durée:", time);
    }

    message.channel
        .send(embed) // On affiche le sondage
        .then(async (msg) => {
            // On affiche les emojis
            var reactionArray = [];
            for (var i = 0; i < optionsList.length; i++) {
                reactionArray[i] = await msg.react(emojiList[i]);
            }

            // On affiche le resultat a la fin du temps (si il y a une durée au sondage)
            if (time) {
                setTimeout(() => {
                    var reactionCountsArray = [];
                    for (var i = 0; i < optionsList.length; i++) {
                        reactionCountsArray[i] =
                            msg.reactions.cache.get(emojiList[i]).count - 1;
                    }

                    // Find winner(s)
                    var max = -Infinity,
                        indexMax = [];
                    for (var i = 0; i < reactionCountsArray.length; ++i)
                        if (reactionCountsArray[i] > max)
                            (max = reactionCountsArray[i]), (indexMax = [i]);
                        else if (reactionCountsArray[i] === max)
                            indexMax.push(i);

                    // Display winner(s)
                    var winnersText = "";
                    if (reactionCountsArray[indexMax[0]] == 0) {
                        winnersText = "Il n'y a eu aucun vote!";
                    } else {
                        for (var i = 0; i < indexMax.length; i++) {
                            winnersText +=
                                emojiList[indexMax[i]] +
                                " " +
                                optionsList[indexMax[i]] +
                                " (" +
                                reactionCountsArray[indexMax[i]] +
                                " vote(s))\n";
                        }
                    }

                    embed.addField("**Winner(s):**", winnersText);
                    msg.edit("", embed);
                    msg.reactions.removeAll();
                }, ms(time));
            }
        })
        .catch(console.error);
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.POLL;
