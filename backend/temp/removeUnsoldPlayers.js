const mongoose = require("mongoose");
const Player = require("../models/playerSchema"); // Import your Player model

const MONGO_URI = "mongodb+srv://shreshaacharya:GYlrUH5p4Q6vUTKN@cluster0.upkij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function resetTeamForPlayers(teamIds) {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });

        console.log("Connected to MongoDB");

        // Update players whose team ID is in the given list
        const result = await Player.updateMany(
            { team: { $in: teamIds } }, // Match players whose team is in teamIds array
            { $set: { team: null } }   // Set team field to null
        );

        console.log(`Updated ${result.modifiedCount} players. Removed team ID.`);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

// Example Team IDs whose players' `team` field should be reset to null
const teamIdsToRemove = [
    "67c34097f17bffaed903735e", 
    "67c3415f3fe2d3afb1958a18", 
    "67c348485fc0728956a138d4",
    "67c44b2a333cbaf2fd61d9c2",
    "67c44b97c961017aefc0aab9"
];

resetTeamForPlayers(teamIdsToRemove);
