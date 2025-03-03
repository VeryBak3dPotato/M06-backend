// Setup
const express = require('express');
// const bodyParser = require("body-parser");
const jwt = require("jwt-simple");
const User = require("./models/users");
const Song = require("./models/songs");
var cors = require('cors');

// Activates app as an express application
const app = express();
app.use(cors());

app.use(express.json());
const router = express.Router();
const secret = "supersecret";

// Create a new user
router.post("/user", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"});
    }
    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    });
    try {
        await newUser.save();
        res.sendStatus(201);
    } catch {
        res.status(400).json({error: "Username already exists"});
    }
});

// Login
router.post("/auth", async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing username or password"});
        return
    }
    let user = await User.findOne({username: req.body.username});
    try{
        if (!user) {
            res.status(400).send(err); 
        } else if (!user) {
            res.status(401).json({error: "User not found"});
        } else {
            if (user.password != req.body.password) {
                res.status(401).json({error: "Incorrect password"});
            } else {
                username2 = user.username;
                const token = jwt.encode({username: user.username}, secret);
                const auth = 1;
                res.json({
                    username2,
                    token:token,
                    auth:auth
                });
            }
        }
    } catch (err) {
        res.status(400).json({error: "User not found"});
    }
});

// Check user status by token
router.get("/status", async (req, res) => {
    if (!req.headers["x-auth"]) {
        return res.status(401).json({error: "Missing X-Auth header"});
    }
    const token = req.headers["x-auth"];
    try {
        const decoded = jwt.decode(token, secret);
        let users = User.find({}, "username staus");
        res.json(users);
    } catch (ex) {
        res.status(401).json({error: "Invalid JWT"});
    }
});

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

// DELETE a song by ID
router.delete("/songs/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        await Song.deleteOne({_id: song._id});
        res.sendStatus(204);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.use("/api", router);
app.listen(3000);