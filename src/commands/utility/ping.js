const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "ping",
    description: "Get the bot's latency.",
    aliases: ["latency"],
    category: "utility",
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const pinging = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.pingpong} Pinging...`)

            message.reply({ embeds: [pinging] })
                .then(msg => {
                    const latency = msg.createdTimestamp - message.createdTimestamp;
                    const apiLatency = Math.round(client.ws.ping);

                    const ping = new Discord.MessageEmbed()
                        .setColor(client.embeds.color)
                        .addFields (
                            { name: "Latency", value: `\`${latency}\`ms` },
                            { name: "API Latency", value: `\`${apiLatency}\`ms` }
                        )

                    msg.edit({ embeds: [ping] });
                })
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}