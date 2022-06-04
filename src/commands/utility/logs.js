const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "logs",
    description: "Set the logs channel for the guild.",
    aliases: ["logging", "modlogs"],
    category: "utility",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: [],
    cooldown: 10,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const schema = require("../../models/logsSchema");
            const channel = message.mentions.channels.first();

            if(!channel) {
                schema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.error(err);
                    }

                    if(data) {
                        const logChannel = new Discord.MessageEmbed()
                            .setColor(client.embeds.color)
                            .setDescription(`${emoji.information} The guild log channel is: <#${data.channel}>`)

                        message.reply({ embeds: [logChannel] });
                    }

                    if(!data) {
                        const noLogChannel = new Discord.MessageEmbed()
                            .setColor(client.embeds.errorColor)
                            .setDescription(`${emoji.error} This guild does not have a log channel set!`)

                        message.reply({ embeds: [noLogChannel] });
                    }
                })
                return;
            }

            schema.findOne({ _id: message.guild.id }, async (err, data) => {
                if(err) {
                    console.log(err);
                }

                if(data) {
                    await schema.findOneAndUpdate({ _id: message.guild.id }, { channel: channel.id });

                    await data.save();
                }

                if(!data) {
                    data = new schema({
                        _id: message.guild.id,
                        channel: channel.id
                    })

                    await data.save();
                }

                const logsSet = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setDescription(`${emoji.successful} The guild logs channel has been set to: ${channel}`)

                message.reply({ embeds: [logsSet] });
            })
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}
