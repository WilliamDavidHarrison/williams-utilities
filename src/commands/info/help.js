const fs = require("fs");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "help",
    description: "Displays a list of all of my commands.",
    aliases: ["support", "commands", "command", "cmds", "cmd"],
    category: "info",
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const prefix = await client.prefix(message);

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

            const funCommands = [];
            const imageCommands = [];
            const infoCommands = [];
            const moderationCommands = [];
            const utilityCommands = [];

            const loadDir = (dirs) => {
                const commandFiles = fs.readdirSync(`./src/commands/${dirs}`).filter(file => file.endsWith(".js"));

                for(const file of commandFiles) {
                    const command = require(`../../commands/${dirs}/${file}`);

                    if(command.name) {
                        if(command.enabled === false || command.ownerOnly === true) {
                            continue;
                        }

                        if(command.userPermissions.length) {
                            const invalidPerms = [];

                            for(const perm of command.userPermissions) {
                                if(!validPermissions.includes(perm)) {
                                    continue;
                                }

                                if(!message.member.permissions.has(perm)) {
                                    invalidPerms.push(perm);
                                }
                            }

                            if(invalidPerms.length) {
                                continue;
                            }
                        }

                        if(command.category) {
                            if(command.category === "fun") {
                                funCommands.push(command.name);
                            }
    
                            if(command.category === "image") {
                                imageCommands.push(command.name);
                            }
    
                            if(command.category === "info") {
                                infoCommands.push(command.name);
                            }
    
                            if(command.category === "moderation") {
                                moderationCommands.push(command.name);
                            }
    
                            if(command.category === "utility") {
                                utilityCommands.push(command.name);
                            }
                        }
                    } else {
                        continue;
                    }
                }
            }
        
            ["fun", "image", "info", "moderation", "utility"].forEach(c => loadDir(c));

            let fun = `\`${funCommands.join("\`, \`")}\``;
            let image = `\`${imageCommands.join("\`, \`")}\``;
            let info = `\`${infoCommands.join("\`, \`")}\``;
            let moderation = `\`${moderationCommands.join("\`, \`")}\``;
            let utility = `\`${utilityCommands.join("\`, \`")}\``;

            if(fun === "``") {
                fun = "N/A";
            }

            if(image === "``") {
                image = "N/A";
            }

            if(info === "``") {
                info = "N/A";
            }
            
            if(moderation === "``") {
                moderation = "N/A";
            }

            if(utility === "``") {
                utility = "N/A";
            }

            if(args[0] === "fun") {
                const help = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Fun Commands")
                    .setDescription(fun)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "image") {
                const help = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Image Commands")
                    .setDescription(image)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "info") {
                const help = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Info Commands")
                    .setDescription(info)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "moderation") {
                const help = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Moderation Commands")
                    .setDescription(moderation)

                message.reply({ embeds: [help] });
                return;
            }

            if(args[0] === "utility") {
                const help = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .setTitle("Utility Commands")
                    .setDescription(utility)

                message.reply({ embeds: [help] });
                return;
            }

            const command = client.commands.get(args[0]) || client.commands.find(a => a.aliases && a.aliases.includes(args[0]));

            if(command) {
                if(command.enabled === false || command.ownerOnly === true) {
                    const help = new Discord.MessageEmbed()
                        .setColor(client.embeds.color)
                        .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTitle("Help")
                        .setDescription(`${emoji.information} My prefix here is: \`${prefix}\``)
                        .addFields (
                            { name: "Fun Commands", value: fun },
                            { name: "Image Commands", value: image },
                            { name: "Info Commands", value: info },
                            { name: "Moderation Commands", value: moderation },
                            { name: "Utility Commands", value: utility }
                        )
                        .setFooter(`Run \"${prefix}help [command]\" to get help on a specific command.`)

                    message.reply({ embeds: [help] });
                    return;
                }

                if(command.userPermissions.length) {
                    const invalidPerms = [];

                    for(const perm of command.userPermissions) {
                        if(!validPermissions.includes(perm)) {
                            continue;
                        }

                        if(!message.member.permissions.has(perm)) {
                            invalidPerms.push(perm);
                        }
                    }

                    if(invalidPerms.length) {
                        const help = new Discord.MessageEmbed()
                            .setColor(client.embeds.color)
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                            .setTitle("Help")
                            .setDescription(`${emoji.information} My prefix here is: \`${prefix}\``)
                            .addFields (
                                { name: "Fun Commands", value: fun },
                                { name: "Image Commands", value: image },
                                { name: "Info Commands", value: info },
                                { name: "Moderation Commands", value: moderation },
                                { name: "Utility Commands", value: utility }
                            )
                            .setFooter(`Run \"${prefix}help [command]\" to get help on a specific command.`)

                        message.reply({ embeds: [help] });
                        return;
                    }
                }

                let description = command.description;

                if(!description) {
                    description = "N/A";
                }

                let aliases = command.aliases;

                if(aliases !== []) {
                    aliases = `\`${aliases.join("\`, \`")}\``;
                } else {
                    aliases = "N/A";
                }

                if(aliases === "``" || !aliases) {
                    aliases = "N/A";
                }

                let userPermissions = command.userPermissions;

                if(userPermissions !== []) {
                    userPermissions = `\`${userPermissions.join("\`, \`")}\``;
                } else {
                    userPermissions = "N/A";
                }

                if(userPermissions === "``") {
                    userPermissions = "N/A";
                }

                let botPermissions = command.botPermissions;

                if(botPermissions !== []) {
                    botPermissions = `\`${botPermissions.join("\`, \`")}\``;
                } else {
                    botPermissions = "N/A";
                }

                if(botPermissions === "``") {
                    botPermissions = "N/A";
                }

                let cooldown = command.cooldown;

                if(cooldown !== "") {
                    cooldown = `\`${command.cooldown}\` seconds`;
                }

                if(cooldown === "" || !cooldown) {
                    cooldown = "\`0\` seconds";
                }

                if(cooldown === "1") {
                    cooldown = "\`1\` second"
                }

                const commandHelp = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .addFields (
                        { name: "Command", value: `\`${command.name}\`` },
                        { name: "Description", value: description },
                        { name: "Aliases", value: aliases },
                        { name: "User Permissions", value: userPermissions },
                        { name: "Bot Permissions", value: botPermissions },
                        { name: "Cooldown", value: cooldown }
                    )

                message.reply({ embeds: [commandHelp] });
                return;
            }

            const help = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setAuthor(client.user.username, client.user.displayAvatarURL({ format: "png", dynamic: true }))
                .setTitle("Help")
                .setDescription(`${emoji.information} My prefix here is: \`${prefix}\``)
                .addFields (
                    { name: "Fun Commands", value: fun },
                    { name: "Image Commands", value: image },
                    { name: "Info Commands", value: info },
                    { name: "Moderation Commands", value: moderation },
                    { name: "Utility Commands", value: utility }
                )
                .setFooter(`Run \"${prefix}help [command]\" to get help on a specific command.`)

            message.reply({ embeds: [help] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}