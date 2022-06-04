module.exports = {
    name: "coinflip",
    description: "Flip a coin.",
    aliases: ["coin"],
    category: "fun",
    userPermissions: [],
    botPermissions: [],
    cooldown: 3,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {
            const results = ["heads", "tails"];
            const result = results[Math.floor(Math.random() * results.length)];

            const flip = new Discord.MessageEmbed()
                .setColor(client.embeds.color)
                .setDescription(`:coin: The coin landed on ${result}.`)

            message.reply({ embeds: [flip] });
        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}