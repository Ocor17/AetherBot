const { SlashCommandBuilder } = require('discord.js');
const firestore = require('../../Firestore');
const admin = require('firebase-admin');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('register for an account')
		,
	async execute(interaction) {
		
		//console.log("TIMESTAMP",interaction.createdTimestamp);

        registerID=crypto.randomUUID();

		while(firestore.isRegistered(registerID)){
			registerID=crypto.randomUUID();
		}

		console.log("UUID:",registerID);

		console.log("REGISTERING")

        firestore.register(
            interaction.user.id,
            interaction.user.displayName,
            admin.firestore.Timestamp.now(),
            registerID
        );

		interaction.reply({ content: `registration ID is: ${registerID}`, ephemeral: true });
	},
};