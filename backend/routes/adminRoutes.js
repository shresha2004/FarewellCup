const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/login", (req, res) => {
    const { id, password } = req.body;
    if (id === process.env.ADMIN_ID && password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
});

module.exports = router;