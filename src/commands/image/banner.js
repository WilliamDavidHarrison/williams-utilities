const axios = require("axios");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "banner",
    description: "Get a user's banner.",
    aliases: [],
    category: "image",
    userPermissions: [],
    botPermissions: [],
    cooldown: 3,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const member = message.mentions.users.first() || message.author;

            const data = await axios.get(`https://discord.com/api/users/${member.id}`, {
                headers: {
                    Authorization: `Bot ${client.token}`
                }
            }).then(d => d.data);

            if(data.banner) {
                let url = data.banner.startsWith("a_") ? ".gif?size=4096": ".png?size=4096";
                url = `https://cdn.discordapp.com/banners/${member.id}/${data.banner}${url}`;

                const authorBanner = new Discord.MessageEmbed()
                    .setColor(client.embeds.color)
                    .setTitle(`${member.tag}'s Banner`)
                    .setImage(url)

                const bannerButton = new Discord.MessageActionRow()
                    .addComponents (
                        new Discord.MessageButton()
                            .setStyle("LINK")
                            .setLabel("Link")
                            .setURL(url)
                    )

                message.reply({ embeds: [authorBanner], components: [bannerButton] });
                return;
            } else {
                const noBanner = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} ${member} does not have a banner!`)

                message.reply({ embeds: [noBanner] });
            }
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}