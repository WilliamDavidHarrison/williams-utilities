const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

require("dotenv").config();

const dashboard = require("./dashboard/server");
const api = require("./api/server");

dashboard(client);
api(client);

client.config = require("./configs/main.json");
client.embeds = require("./configs/embeds.json");

const mongodb = require("./helpers/mongodb");

mongodb();

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
