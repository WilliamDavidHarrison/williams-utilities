const presence = require("../../configs/presence.json");

module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
        try {
			console.log("Bot is Online!");
			console.log(`Logged in as: ${client.user.tag}`);

			client.user.setActivity(presence.activity, { type: presence.activityType });
			client.user.setStatus(presence.status);
		} catch(err) {
			console.error(err);
		}
	}
}