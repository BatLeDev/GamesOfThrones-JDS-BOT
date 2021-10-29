const { MESSAGES } = require("../../utils/constants");
const { PREFIX } = require("../../config.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, cmdHelp) => {
    const msg_err = `Tu as mal tapper la commande !\nVoici comment utiliser la commande: \`${PREFIX}${cmdHelp.name} ${cmdHelp.usage}\``;

    args = args.join(" ");
    if (!args.includes('"'))
        return message.reply(msg_err).then((msg) => {
            msg.delete({ timeout: 15000 });
        });

    args = args.split('"');
    args.splice(0, 1);

    if (args.length < 1 || args.length > 2)
        return message.reply(msg_err).then((msg) => {
            msg.delete({ timeout: 15000 });
        });

    var question = args[0];

    if (args[1] && !args[1] == "") {
        var time = args[2];
        time = time.trim();
    } else {
        args.splice(1, 1);
    }

    var emojiList = ["👍", "👎", "🤷"];

    var embed = new MessageEmbed()
        .setTitle(question)
        .setAuthor(
            `Sondage de ${message.author.username}`,
            message.author.displayAvatarURL
        )
        .setColor("#dbc900");

    if (time) {
        embed.setDescription(`Le sondage dure ${time}`);
    }

    message.channel
        .send(embed)
        .then(async (msg) => {
            var reactionArray = [];
            reactionArray[0] = await msg.react(emojiList[0]);
            reactionArray[1] = await msg.react(emojiList[1]);
            reactionArray[2] = await msg.react(emojiList[2]);

            if (time) {
                setTimeout(() => {
                    var reactionCountsArray = [];
                    for (var i = 0; i < reactionArray.length; i++) {
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
                        winnersText = "Il n'y a aucun vote!";
                    } else {
                        for (var i = 0; i < indexMax.length; i++) {
                            winnersText +=
                                emojiList[indexMax[i]] +
                                " (" +
                                reactionCountsArray[indexMax[i]] +
                                " vote(s))\n";
                        }
                    }

                    embed.addField("**Résultats:**", winnersText);
                    embed.setDescription(
                        `Le sondage est terminé, il a duré ${time}`
                    );

                    msg.edit("", embed);
                }, ms(time));
            }
        })
        .catch(console.error);
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.YESORNO;
