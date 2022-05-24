const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");

require("dotenv").config();

const clientId = processs.env.clientId;

const slashCommands = [];

const loadDir = (dirs) => {
    const slashCommandFiles = fs.readdirSync(`./src/slashcommands/${dirs}`).filter(file => file.endsWith(".js"));

    for(const file of slashCommandFiles) {
        const slashCommand = require(`../slashcommands/${dirs}/${file}`);

        slashCommands.push(slashCommand);
    }
}

["fun", "image", "info", "moderation", "utility"].forEach(sc => loadDir(sc));

const rest = new REST({ version: "9" }).setToken(process.env.token);

(async () => {
	try {
		console.log(`Registering Global Slash Commands!`);

		await rest.put(
            Routes.applicationCommands(clientId),
            { body: slashCommands },
        );

		console.log(`Registered Global Slash Commands!`);
	} catch(err) {
		console.error(err);
	}
})();