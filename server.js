// Starter Code
const dotenv = require("dotenv");
dotenv.config();//loads things from .env
const express = require("express");

const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");


//Connect to mongoose
mongoose.connect(process.env.MONGODB_URI);
//log connection status on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

//Import Weapon model
const Weapon = require("./models/weapon.js")

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

//GET landing page
app.get("/", async (req, res) => {
    res.render("index.ejs")
});

//GET weapon/new route
app.get("/weapons/new", async (req, res) => {
    const allWeapons = await Weapon.find();
    res.render("weapons/new.ejs");
});

//GET show route
app.get("/weapons/:weaponId", async (req, res) => {
    const foundWeapon = await Weapon.findById(req.params.weaponId)
    res.render("weapons/show.ejs", { weapon: foundWeapon });
})

//GET /weapons index page
app.get("/weapons/", async (req, res) => {
    const allWeapons = await Weapon.find();
    res.render('weapons/index.ejs', { weapons: allWeapons })
});

//POST weapons route aka CREATE
app.post("/weapons/", async (req, res) => {
    if (req.body.isEquipped === "on") {
        req.body.isEquipped = true;
    } else {
        req.body.isEquipped = false;
    }
    await Weapon.create(req.body);
    res.redirect("/weapons");
});

//POST delete route
app.delete("/weapons/:weaponId", async (req, res) => {
    await Weapon.findByIdAndDelete(req.params.weaponId);
    res.redirect("/weapons");
});

//GET edit route
app.get("/weapons/:weaponId/edit", async (req, res) => {
    const foundWeapon = await Weapon.findById(req.params.weaponId);
    res.render("weapons/edit.ejs", {
        weapon: foundWeapon,
    });
});


app.listen(3000, () => {
    console.log("Listening on port 3000");
});