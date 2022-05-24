const { Util } = require("discord.js");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "guilds",
    description: "Lists all of the guilds the bot is in.",
    aliases: ["guildslist", "guildlist", "gl"],
    botPermissions: [],
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            const guilds = client.guilds.cache.map(guild => `\`${guild.name}\` | \`${guild.id}\``);

            if(guilds.length > 2000) {
                const [first, ...rest] = Util.splitMessage(guilds.join("\n"), { maxLength: 2000 });

                const guildsList = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setTitle("Guild List")
                    .setDescription(first)

                if(!rest.length) {
                    message.channel.send({ embeds: [guildsList] });
                }

                for(const text of rest) {
                    const restOfGuildsList = new Discord.MessageEmbed()
                        .setColor(client.embeds.color)
                        .setDescription(text)

                    await message.channel.send({ embeds: [restOfGuildsList] });
                }
            } else {
                const guildsList = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setTitle("Guild List")
                    .setDescription(guilds.join("\n"))

                message.reply({ embeds: [guildsList] });
            }
        } catch(err) {
            const error = new Discord.MessageEmbed()
                .setColor(client.embeds.errorColor)
                .setDescription(`${emoji.error} An error occurred!\n\n${err}`)

            message.reply({ embeds: [error] });
        }
    }
}