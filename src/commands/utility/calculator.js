const math = require("mathjs");
const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "calculator",
    description: "Calculate a math question.",
    aliases: ["calculate", "calc", "math"],
    category: "utility",
    userPermissions: [],
    botPermissions: [],
    cooldown: 3,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please enter a question!`)

                message.reply({ embeds: [error1] });
                return;
            }

            const question = args.join(" ");
            const solution = math.evaluate(question);

            const mathSolution = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .addFields (
                    { name: "Question", value: `\`${question}\`` },
                    { name: "Solution", value: `\`${solution}\`` }
                )

            message.reply({ embeds: [mathSolution] });
        } catch(err) {
            const mathError = new Discord.MessageEmbed()
                .setColor(client.embeds.errorColor)
                .setDescription(`${emoji.error} Invalid Question!\n\n${err}`)

            message.reply({ embeds: [mathError] });
        }
    }
}