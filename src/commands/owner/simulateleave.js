const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "simulateleave",
    description: "Simulate a leave.",
    aliases: ["simleave"],
    botPermissions: [],
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            await client.emit("guildMemberRemove", message.member);

            const emitted = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.successful} Simulated a member leaving!`)

            message.reply({ embeds: [emitted] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}