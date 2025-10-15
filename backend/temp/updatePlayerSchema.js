const mongoose = require('mongoose');
const Player = require('../models/playerSchema'); // Adjust path if needed

async function resetTeamIds() {
    try {
        await mongoose.connect('mongodb+srv://shreshaacharya:GYlrUH5p4Q6vUTKN@cluster0.upkij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        const result = await Player.updateMany({}, { $set: { team: null } });

        console.log(`Updated ${result.modifiedCount} players.`);
    } catch (error) {
        console.error('Error updating players:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

resetTeamIds();