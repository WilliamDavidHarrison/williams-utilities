module.exports = {
	name: "roll",
	description: "Roll a dice.",
    category: "fun",
    options: [],
    userPermissions: [],
    botPermissions: [],
    cooldown: 3,
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const rolledNumber = Math.floor(Math.random() * 6) + 1;

            const roll = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`:game_die: You rolled a \`${rolledNumber}\`!`)

            await interaction.editReply({ embeds: [roll] });
        } catch(err) {
            const command = this;

            client.logSlashCommandError(command, err, interaction, Discord);
        }
    }
}