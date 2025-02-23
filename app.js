// Setup
const express = require('express');
var cors = require('cors');

// Activates app as an express application
const bodyParser = require("body-parser");
const Song = require("./models/songs");
const app = express();
app.use(cors());

app.use(express.json());
const router = express.Router();

// GET all songs in a database
router.get("/songs", async (req, res) => {

    // Find all songs in the database
    try {
        const songs = await Song.find({});
        res.json(songs);
    } catch (err) {
        res.status(400).send(err);
    }
});

// GET a song by ID
router.get("/songs/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        res.json(song);
    } catch (err) {
        res.status(400).send(err);
    }
});

// POST a song to the database
router.post("/songs", async (req, res) => {
    try {
        const song = new Song(req.body);
        await song.save();
        res.json(song);
    } catch (err) {
        res.status(400).send(err);
    }
});

// PUT a song by ID
router.put("/songs/:id", async (req, res) => {
    try {
        const song = req.body;
        await Song.updateOne({_id: req.params.id}, song);
        res.json(song);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.use("/api", router);
app.listen(3000);