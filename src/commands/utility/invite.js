module.exports = {
    name: "invite",
    description: "Generate a new invite link.",
    aliases: ["newinvite"],
    category: "utility",
    userPermissions: ["CREATE_INSTANT_INVITE"],
    botPermissions: ["CREATE_INSTANT_INVITE"],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            message.channel.createInvite({
                maxUses: 1,
                maxAge: 600
            }).then(invite => {
                const newInvite = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setTitle("Generated New Invite")
                    .addFields (
                        { name: "Invite Code", value: `[${invite.code}](https://discord.gg/${invite.code})` }
                    )
                    .setFooter("This invite has 1 use and expires in 10 minutes.")

                const inviteButton = new Discord.MessageActionRow()
                    .addComponents (
                        new Discord.MessageButton()
                            .setStyle("LINK")
                            .setLabel("Invite")
                            .setURL(`https://discord.gg/${invite.code}`)
                    )

                message.reply({ embeds: [newInvite], components: [inviteButton] });
            })
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}