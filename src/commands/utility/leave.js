const schema = require("../../models/leaveSchema");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "leave",
    description: "Change the leave message.",
    aliases: ["goodbye"],
    category: "utility",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: [],
    cooldown: 60,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const channel = message.mentions.channels.first();
            const msg = args.slice(1).join(" ");

            if(!args[0]) {
                schema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        const leaveMessage = new Discord.MessageEmbed()
                            .setColor(client.embeds.color)
                            .addFields (
                                { name: "Channel", value: `<#${data.channel}>` },
                                { name: "Message", value: `\`${data.message}\`` }
                            )

                        message.reply({ embeds: [leaveMessage] });
                    }

                    if(!data) {
                        const noLeaveMessage = new Discord.MessageEmbed()
                            .setColor(client.embeds.errorColor)
                            .setDescription(`${emoji.error} This guild does not have a leave message!`)

                        message.reply({ embeds: [noLeaveMessage] });
                    }
                })
                return;
            }

            if(args[0] === "reset") {
                schema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        await schema.findOneAndDelete({ _id: message.guild.id });

                        const resetLeaveMessage = new Discord.MessageEmbed()
                            .setColor(client.embeds.color)
                            .setDescription(`${emoji.successful} Successfully reset the leave message!`)

                        message.reply({ embeds: [resetLeaveMessage] });
                    }

                    if(!data) {
                        const noLeaveMessage = new Discord.MessageEmbed()
                            .setColor(client.embeds.errorColor)
                            .setDescription(`${emoji.error} This guild does not have a leave message!`)

                        message.reply({ embeds: [noLeaveMessage] });
                    }
                })
                return;
            }

            if(!channel) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please specify a leave channel!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(!msg) {
                const error2 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please specify a leave message!`)

                message.reply({ embeds: [error2] });
                return;
            }

            if(msg.length > 2000) {
                const error3 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} The leave message can not be longer than \`2000\` characters!`)

                message.reply({ embeds: [error3] });
                return;
            }

            schema.findOne({ _id: message.guild.id }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(data) {
                    await schema.findOneAndUpdate({ _id: message.guild.id }, {
                        channel: channel.id,
                        message: msg
                    })

                    await data.save();
                }

                if(!data) {
                    data = new schema({
                        _id: message.guild.id,
                        channel: channel.id,
                        message: msg
                    })

                    await data.save();
                }
            })

            const setLeaveMessage = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.successful} Successfully set the leave message!`)

            message.reply({ embeds: [setLeaveMessage] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}