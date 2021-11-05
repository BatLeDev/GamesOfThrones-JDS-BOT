module.exports = {
	async execute(bot, interaction) {
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(bot, interaction);
		} catch (err) {
			if (err) console.error(err);

			await interaction.reply({
				content: "Une erreure est arrivée, contacte <@403589929877372928> pour lui signaler le problème !",
				ephemeral: true,
			});
		}
	}
}