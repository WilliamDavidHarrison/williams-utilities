const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "shutdown",
    description: "Shutdown the bot.",
    aliases: ["kill"],
    botPermissions: [],
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            console.log("Shutting Down...");
            const shuttingdown = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.dnd} Shutting Down...`)

            message.reply({ embeds: [shuttingdown] })
                .then(() => process.exit());
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}