const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "clear",
    description: "Clear messages in a channel.",
    aliases: ["purge"],
    category: "moderation",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please specify the amount of messages to clear!`)

                message.reply({ embeds: [error1] });
                return;
            }
    
            if(isNaN(args[0])) {
                const error2 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please specify a number!`)

                message.reply({ embeds: [error2] });
                return;
            }
    
            if(args[0] > 100 || args[0] < 1) {
                const error3 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} You can only clear between \`1\` and \`100\` messages!`)

                message.reply({ embeds: [error3] });
                return;
            }

            await message.delete();

            await message.channel.messages.fetch({ limit: args[0] })
                .then(messages => message.channel.bulkDelete(messages, true));
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}