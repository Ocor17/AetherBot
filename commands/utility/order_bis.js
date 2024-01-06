const firestore = require('../../Firestore');
const admin = require('firebase-admin');
const { SlashCommandBuilder } = require('discord.js');
const craftedBIS = require('../../CraftedBIS.json');


const data = new SlashCommandBuilder()
.setName('order_bis')
.setDescription('request crafted bis for a class')
.addStringOption(option => 
	option
		.setName('class')
		.setDescription('class to get crafted bis for')
		.setRequired(true)
		.setAutocomplete(true)
);

module.exports = {
	data: data,
	async autocomplete(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		const focusedValue = interaction.options.getFocused().value;
		const choices = Object.keys(craftedBIS.CRAFTED_BIS).toString();
		console.log(choices);
		const filtered = choices.filter(choice => choice.startsWith(focusedValue));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);	
	},
	async execute(interaction) {
		const class_name = interaction.options.getString('class');

		if (Object.keys(craftedBIS.CRAFTED_BIS).includes(class_name) == false){
			interaction.reply({ content: `${class_name} is not a valid class`, ephemeral: true });
			return;
		}


		const bis = craftedBIS.CRAFTED_BIS[class_name];
		craftedURL = craftedBIS.BASE_URL + bis;
		console.log("TIMESTAMP",interaction.createdTimestamp);

		const order = (class_name +": "+craftedURL);

		firestore.addOrder(
			order,
			admin.firestore.Timestamp.now(), 
			interaction.user.displayName,
			interaction.user.id,
			);

		interaction.reply({ content: `${class_name}`, ephemeral: true });
	},
};