const emoji = require("../../configs/emojis.json");

module.exports = {
	name: "ping",
	description: "Bot Latency",
    category: "utility",
    options: [],
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
	async execute(interaction, client, Discord) {
        try {
            const pinging = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.pingpong} Pinging...`)

            const i = await interaction.editReply({ embeds: [pinging], fetchReply: true });

            const latency = i.createdTimestamp - interaction.createdTimestamp;
            const apiLatency = Math.round(client.ws.ping);

            const ping = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .addFields (
                    { name: "Latency", value: `\`${latency}\`ms` },
                    { name: "API Latency", value: `\`${apiLatency}\`ms` }
                )

            await interaction.editReply({ embeds: [ping] });
        } catch(err) {
            const command = this;

            client.logSlashCommandError(command, err, interaction, Discord);
        }
    }
}