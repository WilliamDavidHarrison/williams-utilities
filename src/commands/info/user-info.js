const moment = require("moment");

module.exports = {
    name: "user-info",
    description: "Shows information about a user.",
    aliases: ["userinfo", "user"],
    category: "info",
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.users.first() || message.author;

            const userInfo = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setAuthor(member.tag, member.displayAvatarURL({ format: "png", dynamic: true }))
                .setThumbnail(member.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("User Information")
                .addFields (
                    { name: "Username", value: member.tag },
                    { name: "User ID", value: member.id },
                    { name: "Created At", value: `${moment(member.createdAt).format("MMMM Do YYYY, h:mm:ss a")}` }
                )

            message.reply({ embeds: [userInfo] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}