const emoji = require("../../configs/emojis.json");
const schema = require("../../models/warnSchema");

module.exports = {
    name: "warn",
    description: "Warn a user.",
    aliases: ["warning"],
    category: "moderation",
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.users.first();
            const reason = args.slice(1).join(" ");

            if(!member) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please specify a member!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(!reason) {
                const error2 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please specify a reason!`)

                message.reply({ embeds: [error2] });
                return;
            }

            schema.findOne({
                _id: message.guild.id,
                member: member.id
            }, async (err, data) => {
                if(err) {
                    console.error(err);
                }

                if(!data) {
                    data = new schema({
                        _id: message.guild.id,
                        member: member.id,
                        warnings: [
                            {
                                moderator: message.author.id,
                                reason: reason
                            }
                        ]
                    })
                } else {
                    const object = {
                        moderator: message.author.id,
                        reason: reason
                    }

                    data.warnings.push(object);
                }

                data.save();
            })

            const warn = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setAuthor(message.guild.name, message.guild.iconURL({ format: "png", dynamic: true }))
                .setTitle("Warning")
                .addFields (
                    { name: "Guild", value: `${message.guild.name} | \`${message.guild.id}\`` },
                    { name: "Moderator", value: `${message.author.tag} | \`${message.author.id}\`` },
                    { name: "Reason", value: reason }
                )
                .setTimestamp()

            try {
                await member.send({ embeds: [warn] });
            } catch(err) {
                const warned = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setDescription(`${emoji.successful} ${member} has been warned!`)
                    .setFooter("I couldn't DM them.")
                    .setTimestamp()

                message.reply({ embeds: [warned] });
                return;
            }

            const warned = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.successful} ${member} has been warned!`)
                .setTimestamp()

            message.reply({ embeds: [warned] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}