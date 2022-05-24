const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");

require("dotenv").config();

const config = require("../configs/main.json");
const clientId = config.clientId;
const guildId = config.testGuildId;

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
		console.log(`Registering slash commands to test guild!`);

		await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: slashCommands },
        );

		console.log(`Registered slash commands to test guild!`);
	} catch(err) {
		console.error(err);
	}
})();