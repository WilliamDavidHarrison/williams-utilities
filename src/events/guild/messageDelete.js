module.exports = {
	name: "messageDelete",
	execute(client, Discord, message) {
        try {
            if(message.author.bot || message.partial || (message.embeds.length && !message.content)) return;

            client.snipes.set(message.channel.id, {
                type: "Message Deleted",
                author: message.author,
                content: message.content,
                image: message.attachments.first() ? message.attachments.first().proxyURL : null,
                createdAt: message.createdAt
            })

            client.deleteSnipes.set(message.channel.id, {
                type: "Message Deleted",
                author: message.author,
                content: message.content,
                image: message.attachments.first() ? message.attachments.first().proxyURL : null,
                createdAt: message.createdAt
            })
        } catch(err) {
            console.error(err);
        }
    }
}