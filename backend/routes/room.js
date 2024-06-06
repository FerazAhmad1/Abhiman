const express = require("express");
const { protect, restrictTo } = require("../controllers/auth.js");
const { createRoom, joinRoom } = require("../controllers/room.js");
const router = express.Router();

router.post("/joinroom", joinRoom);
router.route("/").post(protect, restrictTo("prime"), createRoom);

module.exports = router;
