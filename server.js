// Starter Code
const express = require("express");

const app = express();

//GET route
app.get("/", async (req, res) => {
    res.send("Testing!");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});