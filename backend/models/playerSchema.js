// models/playerSchema.js

const mongoose = require('mongoose');

// Define Schema
const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null }
});

// Create Model
const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
