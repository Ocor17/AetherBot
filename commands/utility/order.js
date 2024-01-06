const { SlashCommandBuilder } = require('discord.js');
const firestore = require('../../Firestore');
const admin = require('firebase-admin');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('order')
		.setDescription('request a generalized order')
		.addStringOption(option =>
			option.setName('order')
				.setDescription('the order')
				.setRequired(true))
		,
	async execute(interaction) {
		const order = interaction.options.getString('order');
		console.log("TIMESTAMP",interaction.createdTimestamp);

		firestore.addOrder(
			order,
			admin.firestore.Timestamp.now(), 
			interaction.user.displayName,
			interaction.user.id,
			);

		interaction.reply({ content: `sent order`, ephemeral: true });
	},
};