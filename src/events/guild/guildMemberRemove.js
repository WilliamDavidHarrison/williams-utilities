module.exports = {
    name: "guildMemberRemove",
    async execute(client, Discord, member) {
        try {
            const logsSchema = require("../../models/logsSchema");

            logsSchema.findOne({ _id: member.guild.id }, async (err, data) => {
                if(err) {
                    console.log(err);
                }

                if(data) {
                    const channel = member.guild.channels.cache.get(data.channel);

                    const log = new Discord.MessageEmbed()
                        .setColor(client.embeds.errorColor)
                        .setAuthor(member.user.tag, member.displayAvatarURL({ format: "png", dynamic: true }))
                        .setThumbnail(member.displayAvatarURL({ format: "png", dynamic: true }))
                        .setTitle("Member Left")
                        .setDescription(`${member} | \`${member.id}\``)
                        .setTimestamp()

                    channel.send({ embeds: [log] });
                }
            })

            const requiredPerms = ["SEND_MESSAGES"];

            if(!member.guild.me.permissions.has(requiredPerms) || member.id === client.user.id) return;

            const leaveSchema = require("../../models/leaveSchema");

            leaveSchema.findOne({ _id: member.guild.id }, async (err, data) => {
                if(err) {
                    console.log(err);
                }

                if(data) {
                    const channel = member.guild.channels.cache.get(data.channel);
                    const msg = data.message.replace(/{member}/g, `<@${member.id}>`).replace(/{guild}/g, `${member.guild.name}`);

                    const message = new Discord.MessageEmbed()
                        .setColor(client.embeds.errorColor)
                        .setDescription(msg)

                    channel.send({ content: `${member}`, embeds: [message] });
                }
            })
        } catch(err) {
            console.error(err);
        }
    }
}