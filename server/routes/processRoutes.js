const express = require("express");
const router = express.Router();

const { processInput } = require("../controllers/processController");

router.post("/process", processInput);

module.exports = router;