const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "botinvite",
    description: "Sends the bot invite link.",
    aliases: ["oauth2"],
    category: "info",
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const invite = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.information} Click the button below to invite me.`)

            const inviteButton = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Invite")
                        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=537259089&scope=bot%20applications.commands`)
                )

            message.reply({ embeds: [invite], components: [inviteButton] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor(client.embeds.errorColor)
                .setDescription(`${emoji.error} An error occurred!`)
                
            message.reply({ embeds: [error] });
        }
    }
}