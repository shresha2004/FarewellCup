const express = require('express');
const router = express.Router();
const Player = require('../models/playerSchema'); // Import Player model
const Team = require('../models/teamSchema'); // Import Team model

router.post('/', async (req, res) => {
    try {
        const { playerId, teamId, bidAmount } = req.body;

        // Validate input
        if (!playerId || !teamId || !bidAmount) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Find the team
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ success: false, message: "Team not found" });
        }

        // Check the current number of players in the team
        const playerCount = await Player.countDocuments({ team: teamId });
        
        // If the team already has 11 players, prevent adding more
        if (playerCount > 11) {
            return res.status(400).json({ success: false, message: "Team already has 11 players. Cannot add more." });
        }

        // Check if the team has enough points
        if (team.totalAmount < bidAmount) {
            return res.status(400).json({ success: false, message: "Not enough points in the team balance" });
        }

        // Assign player to the team
        await Player.findByIdAndUpdate(playerId, { team: teamId });

        // Deduct the bidAmount from team's totalAmount
        team.totalAmount -= bidAmount;
        await team.save(); // Save updated team details

        // Respond with success
        return res.json({ success: true, message: "Bid placed successfully! Player assigned to team." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
