// Require the necessary discord.js classes
const { Client, GatewayIntentBits, EmbedBuilder, Embed, Colors } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const fs = require('node:fs');
const dotenv = require('dotenv');
dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	
    
	client.user.setPresence({ activities: [{ name: `vikram code`, type: `WATCHING` }], status: 'dnd' })

	


});


const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Place your client and guild ids here


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(process.env.clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply({ content: 'Pong!' });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'help') {
		await interaction.reply({ content: 'Coming Soon... Text My Friend <@998563525842698311>' });

	}
});



client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'roles') {
		await interaction.reply({ content: 'Check Ur Dm', ephemeral: true });
		wait(3500)
		await interaction.user.send('Contact ur Admin')
		await interaction.editReply({ content: 'Message Sent', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'emojis') {
		if (interaction.options.getSubcommand() === 'rick') {
			await interaction.reply({ content: 'https://images-ext-2.discordapp.net/external/bx0PM8LGED63WkwYGr9tXFsnYxVgxdHqfP1wimjrsPg/https/c.tenor.com/yheo1GGu3FwAAAAd/rick-roll-rick-ashley.gif' })

		} else if (interaction.options.getSubcommand() === 'sharingan') {
			await interaction.reply({ content: 'https://c.tenor.com/d5Y4XuC2HF4AAAAC/itachi-naruti.gif' })
		}
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'server') {
		if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('user');

			const userName = user.username;
			const userId = user.id;

			const userinfo = new EmbedBuilder()
				.setTitle('User Information:-')
				.setAuthor({
					iconURL: user.displayAvatarURL(),
					name: user.tag
				})
				.setColor(1752220)
				.setThumbnail(user.displayAvatarURL())
				.addFields(
					{ name: 'User Name:', value: `${userName}` },
					{ name: 'User Id:', value: `${userId}` },
					{ name: 'User Mention:', value: `<@${userId}>` }
				)
				.setFooter({
					iconURL: interaction.user.displayAvatarURL(),
					text: `Requested By ${interaction.user.tag}`
				})
				.setTimestamp(Date.now())

			await interaction.reply(
				{
					embeds: [userinfo]
				}
			)

		} else if (interaction.options.getSubcommand() === 'info') {

			const guildName = interaction.guild.name;
			const guildMemberCount = interaction.guild.memberCount;
            const IDGuild =  interaction.guild.id; 

			let owner = await interaction.guild.fetchOwner()

			const serverinfo = new EmbedBuilder()
				.setTitle('Server Information:-')
		
				.setColor(1752220)
				.setThumbnail(interaction.guild.iconURL())
				.addFields(
					{name: 'Owner' , value:`${owner}` , inline: true},
					{name: 'Server Name' , value:`${guildName}` },
					{name: 'Server Id' , value:`${IDGuild}`},
					{name: 'Member Count' , value:`${guildMemberCount}` , inline: true}
					
				)
				.setImage(interaction.guild.iconURL())
				.setFooter({
					iconURL: interaction.user.displayAvatarURL(),
					text: `Requested By ${interaction.user.tag}`
				})
				.setTimestamp(Date.now())

			await interaction.reply(
				{
					embeds: [serverinfo]
				}
			)


		}
	}
});



client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'avatar') {
		const user = interaction.options.getUser('user');
		const url = user.displayAvatarURL({ dynamic: true, size: 256 });
		const embed = new EmbedBuilder()
			.setTitle('User Avatar')
			.setAuthor({
				iconURL: user.displayAvatarURL(),
				name: user.tag
			})
			.setImage(url)
			.setColor(1752220)
			.setFooter({
				iconURL: interaction.user.displayAvatarURL(),
				text: `Requested By ${interaction.user.tag}`
			})
			.setTimestamp(Date.now())


		await interaction.reply({
			embeds: [embed]
		})


	}
});




client.login(process.env.token);
