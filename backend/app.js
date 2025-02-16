require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const ejsMate = require('ejs-mate');
const app = express();
const MongoStore = require('connect-mongo');
const Player = require('./models/playerSchema');
const dburl = process.env.DB_URL
const secret = process.env.SECRET

const store = new MongoStore({
    mongoUrl: dburl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret,
    }
});

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

async function main() {

  await mongoose.connect(dburl);
}
main().catch(err => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.get('/', (req, res) => {
    res.render('index');
});


app.post('/register', async (req, res) => {
  try {
      const { name, hostel, year, contact, role, profilePic } = req.body;

      // Create new Player
      const newPlayer = new Player({
          name,
          hostel,
          year,
          contact,
          role,
          profilePic
      });

      // Save Player to Database
      await newPlayer.save();
      res.status(201).json({ message: 'Player registered successfully!' });
  } catch (error) {
      console.error('Error registering player:', error);
      res.status(500).json({ message: 'Failed to register player.' });
  }
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(6001, () => {
    console.log("Serving on port 6001");
});
