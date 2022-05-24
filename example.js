// Command
module.exports = {
    name: "",
    description: "",
    aliases: [],
    category: "",
    userPermissions: [],
    botPermissions: [],
    cooldown: 0,
    enabled: true,
    ownerOnly: false,
    async execute(message, args, cmd, client, Discord) {
        try {

        } catch(err) {
            const command = this;

            client.logCommandError(command, err, message, Discord);
        }
    }
}

// Slash Command
module.exports = {
    name: "",
    description: "",
    category: "",
    options: [],
    userPermissions: [],
    botPermissions: [],
    cooldown: 0,
    enabled: true,
    ownerOnly: false,
    async execute(interaction, client, Discord) {
        try {

        } catch(err) {
            const command = this;

            client.logCommandError(command, err, interaction, Discord);
        }
    }
}

// Event
module.exports = {
	name: "",
	async execute(client, Discord) {
        try {

        } catch(err) {
            console.error(err);
        }
    }
}

// Event (Once)
module.exports = {
	name: "",
	once: true,
	async execute(client, Discord) {
        try {

        } catch(err) {
            console.error(err);
        }
    }
}

// Schema
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    
})

module.exports = mongoose.model("", schema, "")