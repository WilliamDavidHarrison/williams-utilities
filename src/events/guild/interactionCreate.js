const afkSchema = require("../../models/afkSchema");
const emoji = require("../../configs/emojis.json");

const cooldowns = new Map();

module.exports = {
	name: "interactionCreate",
	async execute(client, Discord, interaction) {
        try {
            const requiredPerms = ["SEND_MESSAGES", "EMBED_LINKS"];

            if(!interaction.member.guild.me.permissions.has(requiredPerms)) return;

            afkSchema.findOne({ _id: interaction.user.id }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(data) {
                    if(data.afk === true) {
                        await afkSchema.findOneAndDelete({ _id: interaction.user.id });

                        const removeAFK = new Discord.MessageEmbed()
                            .setColor(client.embeds.color)
                            .setDescription(`${emoji.wave} Welcome back, ${interaction.member}! I have removed your AFK.`)

                        await interaction.channel.send({ embeds: [removeAFK] });
                    }
                }
            })

            if(!interaction.isCommand()) return;

            const command = client.slashCommands.get(interaction.commandName);

            if(!command) return;

            await interaction.deferReply();

            if(command.enabled === false) {
                const commandDisabled = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} This command has been disabled!`)

                await interaction.editReply({ embeds: [commandDisabled] });
                return;
            }

            const validPermissions = [
                "CREATE_INSTANT_INVITE",
                "KICK_MEMBERS",
                "BAN_MEMBERS",
                "ADMINISTRATOR",
                "MANAGE_CHANNELS",
                "MANAGE_GUILD",
                "ADD_REACTIONS",
                "VIEW_AUDIT_LOG",
                "PRIORITY_SPEAKER",
                "STREAM",
                "VIEW_CHANNEL",
                "SEND_MESSAGES",
                "SEND_TTS_MESSAGES",
                "MANAGE_MESSAGES",
                "EMBED_LINKS",
                "ATTACH_FILES",
                "READ_MESSAGE_HISTORY",
                "MENTION_EVERYONE",
                "USE_EXTERNAL_EMOJIS",
                "VIEW_GUILD_INSIGHTS",
                "CONNECT",
                "SPEAK",
                "MUTE_MEMBERS",
                "DEAFEN_MEMBERS",
                "MOVE_MEMBERS",
                "USE_VAD",
                "CHANGE_NICKNAME",
                "MANAGE_NICKNAMES",
                "MANAGE_ROLES",
                "MANAGE_WEBHOOKS",
                "MANAGE_EMOJIS_AND_STICKERS",
                "USE_APPLICATION_COMMANDS",
                "REQUEST_TO_SPEAK",
                "MANAGE_EVENTS",
                "MANAGE_THREADS",
                "CREATE_PUBLIC_THREADS",
                "CREATE_PRIVATE_THREADS",
                "USE_EXTERNAL_STICKERS",
                "SEND_MESSAGES_IN_THREADS",
                "USE_EMBEDDED_ACTIVITIES",
                "MODERATE_MEMBERS"
            ]

            if(command.botPermissions.length) {
                const invalidPerms = [];

                for(const perm of command.botPermissions) {
                    if(!validPermissions.includes(perm)) {
                        return;
                    }

                    if(!interaction.member.guild.me.permissions.has(perm)) {
                        invalidPerms.push(perm);
                    }
                }

                if(invalidPerms.length) {
                    const permError = new Discord.MessageEmbed()
                        .setColor(client.embeds.errorColor)
                        .setDescription(`I am missing these permissions: \`${invalidPerms.join("\`, \`")}\``)

                    await interaction.editReply({ embeds: [permError] });
                    return;
                }
            }

            const owner = client.config.ownerIds.includes(interaction.user.id);

            if(owner) {
                try {
                    await command.execute(interaction, client, Discord);
                    return;
                } catch(err) {
                    const event = this;

                    client.logInteractionEventError(event, command, err, interaction, Discord);
                    return;
                }
            }

            if(command.ownerOnly === true) {
                const permError = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} You do not have permission to peform this command!`)
    
                await interaction.editReply({ embeds: [permError] });
                return;
            }

            if(command.userPermissions.length) {
                const invalidPerms = [];

                for(const perm of command.userPermissions) {
                    if(!validPermissions.includes(perm)) {
                        return;
                    }

                    if(!interaction.member?.permissions.has(perm)) {
                        invalidPerms.push(perm);
                    }
                }

                if(invalidPerms.length) {
                    const permError = new Discord.MessageEmbed()
                        .setColor(client.embeds.errorColor)
                        .setDescription(`${emoji.error} You do not have permission to perform this command!`)

                    await interaction.editReply({ embeds: [permError] });
                    return;
                }
            }

            if(!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const currentTime = Date.now();
            const timeStamps = cooldowns.get(command.name);
            const cooldownAmount = command.cooldown * 1000;

            if(timeStamps.has(interaction.member.id)) {
                const expirationTime = timeStamps.get(interaction.member.id) + cooldownAmount;

                if(currentTime < expirationTime) {
                    const timeLeft = (expirationTime - currentTime) / 1000;

                    if(timeLeft.toFixed(0) > 1 || timeLeft.toFixed(0) < 1) {
                        const cooldown = new Discord.MessageEmbed()
                            .setColor(client.embeds.errorColor)
                            .setDescription(`${emoji.error} Please wait \`${timeLeft.toFixed(0)}\` seconds before running that command again!`)

                        await interaction.editReply({ embeds: [cooldown] });
                        return;
                    }

                    if(timeLeft.toFixed(0) < 2) {
                        const cooldown = new Discord.MessageEmbed()
                            .setColor(client.embeds.errorColor)
                            .setDescription(`${emoji.error} Please wait \`${timeLeft.toFixed(0)}\` second before running that command again!`)

                        await interaction.editReply({ embeds: [cooldown] });
                        return;
                    }
                }
            }

            timeStamps.set(interaction.member.id, currentTime);

            setTimeout(() => {
                timeStamps.delete(interaction.member.id);
            }, cooldownAmount)

            try {
                await command.execute(interaction, client, Discord);
            } catch(err) {
                const event = this;

                client.logInteractionEventError(event, command, err, interaction, Discord);
            }
        } catch(err) {
            console.error(err);
        }
    }
}