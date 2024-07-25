const mongoose = require("mongoose");

const weaponSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    isEquipped: Boolean,
});

const Weapon = mongoose.model("Weapon", weaponSchema);// model