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

		//console.log(firestore.isUnique(registerID));

		while( await firestore.isUnique(registerID,interaction.user.id)){
			console.log(registerID,"is taken")
			registerID=crypto.randomUUID();
		}

        const success = await firestore.register(
            interaction.user.id,
            interaction.user.displayName,
            admin.firestore.Timestamp.now(),
            registerID
        );

		if (success) {
		//Consider a better error message 
		interaction.reply({ content: `registration ID is: ${registerID}`, ephemeral: true });
		} else {
			interaction.reply({ content: `registration failed, account may already exist`, ephemeral: true });
		}
	},
};