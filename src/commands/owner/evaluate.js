const emoji = require("../../configs/emojis.json");

module.exports = {
    name: "evaluate",
    description: "Executes a piece of code.",
    aliases: ["eval", "execute", "run"],
    botPermissions: [],
    enabled: true,
    ownerOnly: true,
    async execute(message, args, cmd, client, Discord) {
        try {
            if(!args[0]) {
                const error1 = new Discord.MessageEmbed()
                    .setColor(client.embeds.errorColor)
                    .setDescription(`${emoji.error} Please enter something to evaluate!`)
    
                message.reply({ embeds: [error1] });
                return;
            }
            
            const input = message.content.split(" ").slice(1).join(" ");
            const output = eval(input);

            console.log(`${message.author.tag}, successfully evaluated: ${input}`);
            const evaluation = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setTitle("Evaluation")
                .setDescription(`${emoji.successful} Evaluation Successful`)
                .addFields (
                    { name: "Input", value: `\`\`\`${input}\`\`\`` },
                    { name: "Output", value: `\`\`\`${output}\`\`\`` }
                )
                    
            message.reply({ embeds: [evaluation] });
            } catch(output) {
            const input = message.content.split(" ").slice(1).join(" ");

            const evalError = new Discord.MessageEmbed()
                .setColor(client.embeds.errorColor)
                .setTitle("Evaluation")
                .setDescription(`${emoji.error} An error occurred!`)
                .addFields (
                    { name: "Input", value: `\`\`\`${input}\`\`\`` },
                    { name: "Output", value: `\`\`\`${output}\`\`\`` }
                )

            message.reply({ embeds: [evalError] });
        }
    }
}