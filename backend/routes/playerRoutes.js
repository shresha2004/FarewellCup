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

module.exports = router;
