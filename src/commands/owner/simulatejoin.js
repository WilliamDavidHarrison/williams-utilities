const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "simulatejoin",
    description: "Simulate a join.",
    aliases: ["simjoin"],
    botPermissions: [],
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            await client.emit("guildMemberAdd", message.member);

            const emitted = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.successful} Simulated a member joining!`)

            message.reply({ embeds: [emitted] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}