const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder()
    .setName('emojis')
	.setDescription('Run this To use Premium emojis without nitro ')
	.addSubcommand(subcommand =>
		subcommand
			.setName('rick')
			.setDescription('rick roll'))
	.addSubcommand(subcommand =>
		subcommand
			.setName('sharingan')
			.setDescription('Best Itachi emoji on discord'))
}
