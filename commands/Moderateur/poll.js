const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require('discord.js');
const ms = require("ms");

module.exports.run = async (bot, message, args, guildsettings, cmdHelp) => {
    const msg_err = `Tu a mal tapé la commande !\nVoici comment utiliser la commande: \`${guildsettings.prefix}${cmdHelp.name} ${cmdHelp.usage}\``;
    
    args = args.join(' ');
    if (!args.includes('"'))
        return message.reply(msg_err).then(msg => {msg.delete({timeout: 15000})});

    args = args.split('"');
    args.splice(0, 1);
    args.splice(1, 1);

   if (args.length < 2 || args.length > 3)
        return message.reply(msg_err).then(msg => {msg.delete({timeout: 15000})});

    var question = args[0];
    var options = args[1];

    if (args[2] && !args[2] == '') {
        var time = args[2]
        time = time.trim()
    } else {args.splice(2, 1)};

    var optionsList = options.split(",");

    if (optionsList < 1)  
        return message.reply(msg_err).then(msg => {msg.delete({timeout: 15000})});

    var emojiList = ['1⃣','2⃣','3⃣','4⃣','5⃣','6⃣','7⃣','8⃣','9⃣','🔟'];
                
    var optionsText = "";
    for (var i = 0; i < optionsList.length; i++) { 
        optionsText += emojiList[i] + " " + optionsList[i] + "\n";
    }

    var embed = new MessageEmbed()
        .setTitle(question)
        .setDescription(optionsText)
        .setAuthor(`Sondage de ${message.author.username}`, message.author.displayAvatarURL)
        .setColor("#dbc900")
        .setFooter('Made by BatLeDev', 'https://cdn.discordapp.com/avatars/403589929877372928/53c289061a41c9ffcad0b48ae9db60e7.png');
    
    if (time) {
        embed.addField('Durée:', time)
    };

        
    message.channel.send(embed)
        .then(async msg => {
            var reactionArray = [];
            for (var i = 0; i < optionsList.length; i++) { 
                reactionArray[i] = await msg.react(emojiList[i]);
            };
            
            if (time) {
                setTimeout(() => {
                    var reactionCountsArray = [];
                    for (var i = 0; i < optionsList.length; i++) {
                        reactionCountsArray[i] = msg.reactions.cache.get(emojiList[i]).count-1;
                    }

                    // Find winner(s)
                    var max = -Infinity, indexMax = [];
                    for(var i = 0; i < reactionCountsArray.length; ++i)
                        if(reactionCountsArray[i] > max) max = reactionCountsArray[i], indexMax = [i];
                        else if(reactionCountsArray[i] === max) indexMax.push(i);
            
                    // Display winner(s)
                    var winnersText = "";
                    if (reactionCountsArray[indexMax[0]] == 0) {
                        winnersText = "Il n'y a eu aucun vote!";
                    } else {
                        for (var i = 0; i < indexMax.length; i++) {
                            winnersText += 
                                emojiList[indexMax[i]] + " " + optionsList[indexMax[i]] + 
                                " (" + reactionCountsArray[indexMax[i]] + " vote(s))\n";
                        };
                    };
                    
                    embed.addField("**Winner(s):**", winnersText);
                    msg.edit("", embed);
                    msg.reactions.removeAll();
                }, ms(time));
            }
        }).catch(console.error);
};

module.exports.help = MESSAGES.COMMANDS.MODERATEUR.POLL;