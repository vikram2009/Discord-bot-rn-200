// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
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
		await interaction.reply({ content: 'Check Ur Dm' , ephemeral:true});
		wait(3500)
		await interaction.user.send('Contact ur Admin')
        await interaction.editReply({ content: 'Message Sent' , ephemeral:true});
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'emojis') {
		if (interaction.options.getSubcommand() === 'rick') {
			await interaction.reply({content : 'https://images-ext-2.discordapp.net/external/bx0PM8LGED63WkwYGr9tXFsnYxVgxdHqfP1wimjrsPg/https/c.tenor.com/yheo1GGu3FwAAAAd/rick-roll-rick-ashley.gif'})
			
		} else if (interaction.options.getSubcommand() === 'sharingan') {
			await interaction.reply({content : 'https://c.tenor.com/d5Y4XuC2HF4AAAAC/itachi-naruti.gif'})
		}
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'server') {
		if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('user');

			if (user) {
				await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
			} else {
				await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
			}
		} else if (interaction.options.getSubcommand() === 'info') {
			await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
		}
	}
});




client.login(process.env.token);




