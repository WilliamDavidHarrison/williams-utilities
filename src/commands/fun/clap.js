const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "clap",
    description: "Clapify your message.",
    aliases: ["clapify"],
    category: "fun",
    userPermissions: [],
    botPermissions: [],
    cooldown: 5,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const msg = args.join(" :clap: ");

            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} You must specify a message!`)

                message.reply({ embeds: [error1] });
                return;
            }

            if(!args[1]) {
                const error2 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} You must specify at least \`2\` arguments!`)

                message.reply({ embeds: [error2] });
                return;
            }

            if(msg.length > 2000) {
                const error3 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} The message can not be longer than \`2000\` characters!`)

                message.reply({ embeds: [error3] });
                return;
            }

            message.reply(msg);
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}