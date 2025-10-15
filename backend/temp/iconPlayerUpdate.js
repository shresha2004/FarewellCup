const mongoose = require("mongoose");
const Team = require("../models/teamSchema");   // Import your Team model
const Player = require("../models/playerSchema"); // Import your Player model

const MONGO_URI = "mongodb+srv://shreshaacharya:GYlrUH5p4Q6vUTKN@cluster0.upkij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function assignPlayerToTeam(playerId, teamId, deductionAmount) {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });

        console.log("Connected to MongoDB");

        // Fetch the team by ID
        const team = await Team.findById(teamId);
        if (!team) {
            console.log("Team not found");
            return;
        }

        // Deduct amount from team's totalAmount
        if (team.totalAmount >= deductionAmount) {
            team.totalAmount -= deductionAmount;
        } else {
            console.log("Not enough funds in team!");
            return;
        }

        // Update the player with team ID
        const player = await Player.findByIdAndUpdate(playerId, { team: teamId }, { new: true });

        // Save updated team
        await team.save();

        console.log(`Assigned ${player.name} to team ${team.teamName}. New team balance: ${team.totalAmount}`);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

// Example Usage
const playerId = "67c2d8d424ad0261d30e7ba9";  // Replace with actual player ID
const teamId = "67b6bf4969451a18080f301c";    // Replace with actual team ID
const deductionAmount =500;  // Amount to deduct per player

assignPlayerToTeam(playerId, teamId, deductionAmount);
