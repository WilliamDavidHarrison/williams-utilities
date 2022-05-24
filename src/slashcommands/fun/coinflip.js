module.exports = {
    name: "coinflip",
    description: "Flip a coin.",
    category: "fun",
    options: [],
    userPermissions: [],
    botPermissions: [],
    cooldown: 3,
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const results = ["heads", "tails"];
            const result = results[Math.floor(Math.random() * results.length)];

            const flip = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`:coin: The coin landed on ${result}.`)

            await interaction.editReply({ embeds: [flip] });
        } catch(err) {
            const command = this;

            client.logSlashCommandError(command, err, interaction, Discord);
        }
    }
}