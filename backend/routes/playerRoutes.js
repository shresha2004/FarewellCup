const express = require("express");
const router = express.Router();
const Player = require("../models/playerSchema");

// Register a new player
router.post("/register", async (req, res) => {
    try {
        const { name, hostel, year, contact, role, profilePic } = req.body;

        const newPlayer = new Player({
            name,
            hostel,
            year,
            contact,
            role,
            profilePic
        });

        await newPlayer.save();
        res.status(201).json({ message: "Player registered successfully!" });

    } catch (error) {
        console.error("Error registering player:", error);
        res.status(500).json({ message: "Failed to register player." });
    }
});

// Get all players
router.get("/", async (req, res) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ message: "Failed to fetch players." });
    }
});

router.get("/:teamId", async (req, res) => {
    try {
        const { teamId } = req.params;
        const players = await Player.find({ team: teamId });
        console.log(players);
        if (!players.length) {
            return res.status(404).json({ message: "No players found for this team." });
        }

        res.status(200).json(players);
    } catch (error) {
        console.error("Error fetching players by team ID:", error);
        res.status(500).json({ message: "Failed to fetch players." });
    }
});
module.exports = router;
