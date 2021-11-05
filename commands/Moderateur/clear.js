const { MESSAGES } = require("../../utils/constants");

module.exports.execute = async (bot, interaction) => {
    const number = interaction.options.getNumber("nombre")
    try {
        await interaction.channel.bulkDelete(number); // On supprime le nombre de messages
        await interaction.reply({
            content: `${number} messages viennent d'être supprimés`,
        })
    } catch { // En cas d'erreur (limitation de discord)
        await interaction
            .reply(
                {
                    content: `Due à la limitation de Discord, je ne peut pas supprimer de messages datant de plus de \`14 jours...\`\nPour clear tout le salon, dupliquez le, puis supprimez celui là !`,
                    ephemeral: true,
                }                
            )
    }

};


module.exports.help = MESSAGES.COMMANDS.MODERATEUR.CLEAR;