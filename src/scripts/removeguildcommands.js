const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("node:fs");

require("dotenv").config();

const config = require("../configs/main.json");
const clientId = config.clientId;
const guildId = config.testGuildId;

const slashCommands = [];

const rest = new REST({ version: "9" }).setToken(process.env.token);

(async () => {
	try {
		console.log(`Removing slash commands from test guild!`);

		await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: slashCommands },
        );

		console.log(`Removed slash commands to test guild!`);
	} catch(err) {
		console.error(err);
	}
})();