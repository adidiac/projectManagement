const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");

const router = express.Router();

// Routes
// user is in query params
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;
