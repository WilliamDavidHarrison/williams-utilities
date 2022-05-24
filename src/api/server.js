module.exports = () => {
    const express = require("express");
    const app = express();

    const fs = require("fs");
    require("dotenv").config();

    app.get("/", (req, res) => {
        res.redirect("https://bot.williamharrison.dev");
    })

    app.listen(process.env.api_port, () => console.log(`API Listening on Port: ${process.env.api_port}`));
}