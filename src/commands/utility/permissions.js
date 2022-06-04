const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "permissions",
    description: "Check if the bot has the required permissions.",
    aliases: ["perms", "checkperms"],
    category: "utility",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: [],
    cooldown: 60,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const permissions = {
                MANAGE_CHANNELS: "Manage Channels",
                CREATE_INSTANT_INVITE: "Create Invite",
                MANAGE_EMOJIS_AND_STICKERS: "Manage Emojis and Stickers",
                MANAGE_WEBHOOKS: "Manage Webhooks",
                VIEW_CHANNEL: "Read Messages/View Channels",
                SEND_MESSAGES: "Send Messages",
                MANAGE_MESSAGES: "Manage Messages",
                EMBED_LINKS: "Embed Links",
                READ_MESSAGE_HISTORY: "Read Message History",
                ADD_REACTIONS: "Add Reactions",
                USE_EXTERNAL_EMOJIS: "Use External Emojis"
            }

            const perms = [];

            for(const perm of Object.keys(permissions)) {
                if(message.guild.me.permissions.has(perm)) {
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
                        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1610968145&scope=bot%20applications.commands`)
                )

            message.reply({ embeds: [permissionsEmbed], components: [inviteButton] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}