module.exports = {
    name: "guildMemberAdd",
    async execute(client, Discord, member) {
        try {
            const logsSchema = require("../../models/logsSchema");
            const moment = require("moment");

            logsSchema.findOne({ _id: member.guild.id }, async (err, data) => {
                if(err) {
                    console.log(err);
                }

                if(data) {
                    const channel = member.guild.channels.cache.get(data.channel);

                    const log = new Discord.MessageEmbed()
                        .setColor(client.embeds.color)
                        .setAuthor(member.user.tag, member.displayAvatarURL({ format: "png", dynamic: true }))
                        .setThumbnail(member.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTitle("Member Joined")
                        .setDescription(`${member} | \`${member.id}\``)
                        .addFields (
                            { name: "Account Created", value: `${moment(member.user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}` },
                            { name: "Joined Guild", value: `${moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a")}` },
                        )
                        .setTimestamp()

                    channel.send({ embeds: [log] });
                }
            })

            const requiredPerms = ["SEND_MESSAGES"];

            if(!member.guild.me.permissions.has(requiredPerms) || member.id === client.user.id) return;

            const joinSchema = require("../../models/joinSchema");

            joinSchema.findOne({ _id: member.guild.id }, async (err, data) => {
                if(err) {
                    console.log(err);
                }

                if(data) {
                    const channel = member.guild.channels.cache.get(data.channel);
                    const msg = data.message.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`);

                    const message = new Discord.MessageEmbed()
                        .setColor(client.embeds.color)
                        .setDescription(msg)

                    channel.send({ content: `${member}`, embeds: [message] });
                }
            })
        } catch(err) {
            console.error(err);
        }
    }
}