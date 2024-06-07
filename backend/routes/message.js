const express = require("express");

const router = express.Router();
const { protect } = require("../controllers/auth.js");
const { saveMessage, recieveAllMessge } = require("../controllers/message.js");
router.route("/").post(protect, saveMessage);
router.route("/:userChatroomId").get(protect, recieveAllMessge);
module.exports = router;
