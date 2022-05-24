try {
    const fs = require("fs");

    module.exports = async (client, Discord) => {
        const loadDir = (dirs) => {
            const eventFiles = fs.readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith(".js"));

            for(const file of eventFiles) {
                const event = require(`../events/${dirs}/${file}`);

                client.events.set(event.name, event);

                console.log(`Loaded Event: ${event.name}`);

                if(event.once) {
                    client.once(event.name, (message, interaction) => event.execute(client, Discord, message, interaction));
                } else {
                    client.on(event.name, (message, interaction) => event.execute(client, Discord, message, interaction));
                }
            }
        }

        ["client", "guild"].forEach(e => loadDir(e));
    }
} catch(err) {
    console.log(err);
}