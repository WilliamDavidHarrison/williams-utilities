const { Util } = require("discord.js");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "emoji",
    description: "Add an emoji to your server.",
    aliases: ["stealemoji"],
    category: "image",
    userPermissions: ["MANAGE_EMOJIS_AND_STICKERS"],
    botPermissions: ["MANAGE_EMOJIS_AND_STICKERS"],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args.length) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} You must specify at least one emoji!`)

                message.reply({ embeds: [error1] });
                return;
            }

            for(const rawemoji of args) {
                const parsedemoji = Util.parseEmoji(rawemoji);

                if(parsedemoji.id) {
                    const extension = parsedemoji.animated ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/emojis/${parsedemoji.id + extension}`;

                    message.guild.emojis.create(url, parsedemoji.name)
                        .then(pemoji => {
                            if(pemoji.animated === true) {
                                const addedAnimatedEmoji = new Discord.MessageEmbed()
                                    .setColor(client.embeds.color)
                                    .setDescription(`Added Emoji: ${pemoji} \`<a:${pemoji.name}:${pemoji.id}>\``)

                                message.reply({ embeds: [addedAnimatedEmoji] });
                                return;
                            }

                            const addedEmoji = new Discord.MessageEmbed()
                                .setColor(client.embeds.color)
                                .setDescription(`Added Emoji: ${pemoji} \`<${pemoji.name}:${pemoji.id}>\``)

                            message.reply({ embeds: [addedEmoji] });
                        })
                }
            }
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}