const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "leave",
    description: "Make the bot leave a guild.",
    aliases: ["leaveguild", "leaveserver"],
    botPermissions: [],
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const guildID = args[0];

            if(!guildID) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please specify a guild ID!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(isNaN(guildID)) {
                const error2 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please specify a valid guild ID!`)

                message.reply({ embeds: [error2] });
                return;
            }

            const guild = client.guilds.cache.get(guildID);

            if(!guild) {
                const error3 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} I am not in that guild!`)

                message.reply({ embeds: [error3] });
                return;
            }

            if(guild.id === client.config.testGuildId) {
                const error4 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} You can not make me leave the test guild!`)

                message.reply({ embeds: [error4] });
                return;
            }

            if(guild.id === message.guild.id) {
                const error5 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} You can not make me leave the guild you are currently in!`)

                message.reply({ embeds: [error5] });
                return;
            }

            guild.leave();

            const guildLeave = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`${emoji.successful} I have left guild: \`${guild.id}\``)

            message.reply({ embeds: [guildLeave] });
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor(client.embeds.errorColor)
                .setDescription(`${emoji.error} An error occurred!`)
                
            message.reply({ embeds: [error] });
        }
    }
}