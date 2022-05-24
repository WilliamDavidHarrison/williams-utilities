const { re } = require("mathjs");

module.exports = (client) => {
    const express = require("express");
    const app = express();

    const fs = require("fs");
    require("dotenv").config();

    app.get("/", (req, res) => {
        let stats = fs.readFileSync("src/dashboard/index.html", { encoding: "utf8" });

        stats = stats.replace("{avatar}", client.user.avatarURL({ format: "png", dynamic: true }));
        stats = stats.replace("{username}", client.user.username);
        stats = stats.replace("{client-id}", client.user.id);
        stats = stats.replace("{ping}", client.ws.ping);
        stats = stats.replace("{guilds}", client.guilds.cache.size);
        stats = stats.replace("{users}", client.users.cache.size);

        res.send(stats);
    })

    app.listen(process.env.dashboard_port, () => console.log(`Dashboard Listening on Port: ${process.env.dashboard_port}`));
}