require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js');
const gearData = require('./CraftedBIS.json');
const token = process.env.DISCORD_TOKEN;


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on(Events.InteractionCreate, (interaction) => {

	if(!interaction.isAutocomplete()) return; 

	if(!interaction.commandName === 'order_bis') return;
	const focusedValue = interaction.options.getFocused();

	const filteredChoices = Object.keys(gearData.CRAFTED_BIS).filter((gear) =>
		gear.startsWith(focusedValue.toUpperCase())
	);
	const results = filteredChoices.map((gear) => {
	return{
		name: gear, 
		value: gear
	}
	});

	interaction.respond(results.slice(0, 25)).catch(()=>{});

	console.log(focusedValue);

});

client.login(token);
