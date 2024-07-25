// Starter Code
const dotenv = require("dotenv");
dotenv.config();//loads things from .env
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//Connect to mongoose
mongoose.connect(process.env.MONGODB_URI);
//log connection status on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Import Weapon model
const Fruit = require("./models/weapon.js")

//GET route
app.get("/", async (req, res) => {
    res.send("Testing!");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});