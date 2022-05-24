module.exports = {
    name: "avatar",
    description: "Get a user's avatar.",
    category: "image",
    options: [
        {
            type: 6,
            name: "member",
            description: "Get a member's avatar."
        }
    ],
    userPermissions: [],
    botPermissions: [],
    cooldown: 3,
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const member = interaction.options.getUser("member") || interaction.user;
            const url = member.displayAvatarURL({ format: "png", dynamic: true });

            const userAvatar = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setTitle(`${member.tag}'s Avatar`)
                .setImage(url)

            const avatarButton = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Link")
                        .setURL(url)
                )

            await interaction.editReply({ embeds: [userAvatar], components: [avatarButton] });
        } catch(err) {
            const command = this;

            client.logSlashCommandError(command, err, interaction, Discord);
        }
    }
}