const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "say",
    description: "Say something as the bot.",
    category: "fun",
    options: [
        {
            type: 3,
            required: true,
            name: "message",
            description: "Message to send as the bot."
        }
    ],
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_CHANNELS", "MANAGE_WEBHOOKS"],
    cooldown: 10,
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const message = interaction.options.getString("message");

            await interaction.channel.send({ content: `${message}`, allowedMentions: { parse: [] } });

            const sent = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.successful} Sent the message!`)

            await interaction.editReply({ embeds: [sent] });
        } catch(err) {
            const command = this;

            client.logSlashCommandError(command, err, interaction, Discord);
        }
    }
}