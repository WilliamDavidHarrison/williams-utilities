try {
    const fs = require("fs");

    module.exports = async (client) => {
        const loadDir = (dirs) => {
            const slashCommandFiles = fs.readdirSync(`./src/slashcommands/${dirs}`).filter(file => file.endsWith(".js"));

            for(const file of slashCommandFiles) {
                const slashCommand = require(`../slashcommands/${dirs}/${file}`);

                client.slashCommands.set(slashCommand.name, slashCommand);

                console.log(`Loaded Slash Command: ${slashCommand.name}`);
            }
        }

        ["owner", "fun", "image", "info", "moderation", "utility"].forEach(sc => loadDir(sc));
    }
} catch(err) {
    console.log(err);
}