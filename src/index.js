const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

require("dotenv").config();

const mongodb = require("./helpers/mongodb");
const dashboard = require("./dashboard/server");

mongodb();
dashboard(client);

client.config = require("./configs/main.json");
client.embeds = require("./configs/embeds.json");

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.events = new Discord.Collection();

["command", "slashCommand", "event"].forEach(handler => {
    require(`./handlers/${handler}`) (client, Discord);
})

client.snipes = new Discord.Collection();
client.deleteSnipes = new Discord.Collection();
client.editSnipes = new Discord.Collection();

client.login(process.env.token);