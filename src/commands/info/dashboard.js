const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "dashboard",
    description: "Sends a link to the bot's dashboard.",
    aliases: ["website"],
    category: "info",
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const link = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.information} Click the button below to go to the dashboard.`)

            const linkButton = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Link")
                        .setURL(`https://bot.williamharrison.dev`)
                )

            message.reply({ embeds: [link], components: [linkButton] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}
