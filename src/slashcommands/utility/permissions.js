const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "permissions",
    description: "Check if the bot has the required permissions.",
    category: "utility",
    options: [],
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: [],
    cooldown: 60,
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {
            const permissions = {
                CREATE_INSTANT_INVITE: "Create Invite",
                MANAGE_CHANNELS: "Manage Channels",
                MANAGE_WEBHOOKS: "Manage Webhooks",
                VIEW_CHANNEL: "View Channels",
                SEND_MESSAGES: "Send Messages",
                MANAGE_MESSAGES: "Manage Messages",
                EMBED_LINKS: "Embed Links",
                ATTACH_FILES: "Attach Files",
                READ_MESSAGE_HISTORY: "Read Message History",
                ADD_REACTIONS: "Add Reactions",
                USE_EXTERNAL_EMOJIS: "Use External Emojis"
            }

            const perms = [];

            for(const perm of Object.keys(permissions)) {
                if(interaction.guild.me.permissions.has(perm)) {
                    perms.push(`${emoji.successful} ${permissions[perm]}`);
                } else {
                    perms.push(`${emoji.error} ${permissions[perm]}`);
                }
            }

            const permissionsEmbed = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setTitle("Permissions")
                .setDescription(perms.join("\n"))

            const inviteButton = new Discord.MessageActionRow()
                .addComponents (
                    new Discord.MessageButton()
                        .setStyle("LINK")
                        .setLabel("Invite")
                        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=537259089&scope=bot%20applications.commands`)
                )

            await interaction.editReply({ embeds: [permissionsEmbed], components: [inviteButton] })
        } catch(err) {
            const command = this;

            client.logSlashCommandError(command, err, interaction, Discord);
        }
    }
}