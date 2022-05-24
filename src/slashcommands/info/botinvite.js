const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "botinvite",
    description: "Sends the bot invite link.",
    category: "info",
    options: [],
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
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

            await interaction.editReply({ embeds: [invite], components: [inviteButton] });
        } catch(err) {
            const command = this;

            client.logSlashCommandError(command, err, interaction, Discord);
        }
    }
}