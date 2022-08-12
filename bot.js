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




client.login(process.env.token);




