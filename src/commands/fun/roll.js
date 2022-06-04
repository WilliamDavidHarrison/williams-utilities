module.exports = {
    name: "roll",
    description: "Roll a 6-sided dice.",
    aliases: ["rolldice", "rolldie"],
    category: "fun",
    userPermissions: [],
    botPermissions: [],
    cooldown: 3,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const rolledNumber = Math.floor(Math.random() * 6) + 1;

            const roll = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`:game_die: You rolled a \`${rolledNumber}\`!`)

            message.reply({ embeds: [roll] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}