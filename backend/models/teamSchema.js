const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  captainName: { type: String, required: true },
  captainContact: { type: String, required: true },
  iconPlayerName: { type: String, required: true },
  iconPlayerContact: { type: String, required: true },
  captainHostel: { type: String, required: true },
  iconPlayerHostel: { type: String, required: true },
  captainYearOfStudy: { type: String, required: true },
  iconPlayerYearOfStudy: { type: String, required: true },
  teamLogo: { type: String, required: true }, // URL of the uploaded image
  captainImage: { type: String, required: true }, // URL of the uploaded image
  iconPlayerImage: { type: String, required: true } ,// URL of the uploaded image
  totalAmount: { type: Number, default: 10000 }
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
