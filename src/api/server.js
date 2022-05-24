module.exports = (client) => {
    const express = require("express");
    const app = express();

    const fs = require("fs");
    require("dotenv").config();

    app.get("/configs/embeds", (req, res) => {
        const json = require("./configs/embeds.json");
        res.json(json);
    })
    
    app.get("/configs/emojis", (req, res) => {
        const json = require("./configs/emojis.json");
        res.json(json);
    })
    
    app.get("/configs/presence", (req, res) => {
        const json = require("./configs/presence.json");
        res.json(json);
    })

    app.listen(process.env.api_port, () => console.log(`API Listening on Port: ${process.env.api_port}`));
}