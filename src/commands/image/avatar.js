module.exports = {
    name: "avatar",
    description: "Get a user's avatar.",
    aliases: ["av", "pfp"],
    category: "image",
    userPermissions: [],
    botPermissions: [],
    cooldown: 3,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.users.first() || message.author;
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

            message.reply({ embeds: [userAvatar], components: [avatarButton] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}