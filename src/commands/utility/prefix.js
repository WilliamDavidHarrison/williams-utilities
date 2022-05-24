const schema = require("../../models/prefixSchema");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "prefix",
    description: "Change the guild prefix.",
    aliases: [],
    category: "utility",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: [],
    cooldown: 60,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const prefix = await client.prefix(message);
            const newPrefix = args[0];

            if(!newPrefix) {
                const guildPrefix = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setDescription(`${emoji.information} My prefix here is: \`${prefix}\``)

                message.reply({ embeds: [guildPrefix] });
                return;
            }

            if(newPrefix === "reset" || newPrefix === client.config.defaultPrefix) {
                schema.findOne({ _id: message.guild.id }, async (err, data) => {
                    if(err) {
                        console.log(err);
                    }

                    if(data) {
                        await schema.findOneAndDelete({ _id: message.guild.id });

                        const prefixReset = new Discord.MessageEmbed()
                            .setColor(client.embeds.color)
                            .setDescription(`${emoji.successful} The guild prefix has been reset to the default prefix: \`${client.config.defaultPrefix}\``)

                        message.reply({ embeds: [prefixReset] });
                    }

                    if(!data) {
                        const noCustomPrefix = new Discord.MessageEmbed()
                            .setColor(client.embeds.errorColor)
                            .setDescription(`${emoji.error} This guild does not have a custom prefix!`)

                        message.reply({ embeds: [noCustomPrefix] });
                    }
                })
                return;
            }

            if(newPrefix.length > 5) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} The new prefix can not be longer than \`5\` characters!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(newPrefix === "/") {
                const error2 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} The new prefix can not set to \`/\`!`)

                message.reply({ embeds: [error2] });
                return;
            }

            schema.findOne({ _id: message.guild.id }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(data) {
                    await schema.findOneAndUpdate({ _id: message.guild.id }, { prefix: newPrefix });

                    await data.save();

                }

                if(!data) {
                    data = new schema({
                        _id: message.guild.id,
                        prefix: newPrefix
                    })

                    await data.save();
                }
            })

            const prefixSet = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.successful} The guild prefix has been set to: \`${newPrefix}\``)

            message.reply({ embeds: [prefixSet] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}