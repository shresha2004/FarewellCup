const express = require("express");
const router = express.Router();
const Team = require("../models/teamSchema");

// Register a new team
router.post("/register", async (req, res) => {
    try {
        const { 
            teamName, captainName, captainContact, iconPlayerName, 
            iconPlayerContact, captainHostel, iconPlayerHostel, 
            captainYearOfStudy, iconPlayerYearOfStudy, teamLogo, 
            captainImage, iconPlayerImage 
        } = req.body;

        if (!teamLogo || !captainImage || !iconPlayerImage) {
            return res.status(400).json({ error: "Image upload failed" });
        }

        const newTeam = new Team({
            teamName,
            captainName,
            captainContact,
            iconPlayerName,
            iconPlayerContact,
            captainHostel,
            iconPlayerHostel,
            captainYearOfStudy,
            iconPlayerYearOfStudy,
            teamLogo,
            captainImage,
            iconPlayerImage
        });

        await newTeam.save();
        console.log("Team Registered:", newTeam);
        res.status(201).json({ message: "Team registered successfully", team: newTeam });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Get all teams
router.get("/", async (req, res) => {
    try {
        const teams = await Team.find();
       
        res.status(200).json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        res.status(500).json({ message: "Failed to fetch teams." });
    }
});

router.get("/:teamId", async (req, res) => {
    try {
        const teamId = req.params.teamId;
        const team = await Team.findById(teamId);
        console.log(team);

        if (!team) {
            return res.status(404).json({ error: "Team not found" });
        }

        res.status(200).json(team);
    } catch (error) {
        console.error("Error fetching team:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
