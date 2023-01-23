const express = require("express");
const router = express.Router();
const {
  addInstructor,
  getInstructor,
} = require("../controllers/instructorController");

router.post("/add", addInstructor);
router.get("/:id", getInstructor);

module.exports = router;
