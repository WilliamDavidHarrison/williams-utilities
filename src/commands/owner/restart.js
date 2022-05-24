const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "restart",
    description: "Restart the bot.",
    aliases: ["reload"],
    botPermissions: [],
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            console.log("Restarting...");
            const restarting = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.idle} Restarting...`)

            message.reply({ embeds: [restarting] });

            await client.destroy();
            await client.login(process.env.token);
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}