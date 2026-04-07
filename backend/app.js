require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const ejsMate = require("ejs-mate");
const MongoStore = require("connect-mongo");
const app = express();

// Import routes
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bidRoutes = require("./routes/bidRoutes");

const dburl = process.env.DB_URL;
const secret = process.env.SECRET;

// Mongo session store
const store = new MongoStore({
    mongoUrl: dburl,
    touchAfter: 24 * 60 * 60,
    crypto: { secret },
});

const corsOptions = {

    // origin: "http://localhost:5173",
    origin: "https://farewell-cup-frontend.vercel.app",

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
async function main() {
    await mongoose.connect(dburl);
}
main().catch(err => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

// Routes
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bid", bidRoutes);


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/favicon.ico", (req, res) => res.status(204));

app.listen(6002, () => {
    console.log("Server running on port 6002");
});
