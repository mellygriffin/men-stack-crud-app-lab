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
const Weapon = require("./models/weapon.js")

app.use(express.urlencoded({ extended: false }));

//GET landing page route
app.get("/", async (req, res) => {
    res.send("Testing!");
});

//GET weapon/new route
app.get("/weapons/new", (req, res) => {
    res.render("weapons/new.ejs");
});

//POST weapons route
app.post("/weapons", async (req, res) => {
    if (req.body.isEquipped === "on") {
        req.body.isEquipped = true;
    } else {
        req.body.isEquipped = false;
    }
    await Weapon.create(req.body);
    res.redirect("/weapons/new");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});