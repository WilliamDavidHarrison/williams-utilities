const bot = require("../../../package.json");

module.exports = {
    name: "bot-info",
    description: "Get information about the bot.",
    aliases: ["botinfo", "bot"],
    category: "info",
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            const uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

            const botInfo = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("Bot Information")
                .addFields (
                    { name: "Bot", value: client.user.username },
                    { name: "Bot ID", value: `\`${client.user.id}\`` },
                    { name: "Version", value: `\`${bot.version}\`` },
                    { name: "Developer", value: bot.author },
                    { name: "Uptime", value: uptime },
                    { name: "Guilds", value: `\`${client.guilds.cache.size}\`` },
                    { name: "Users", value: `\`${client.users.cache.size}\`` }
                )

            message.reply({ embeds: [botInfo] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}