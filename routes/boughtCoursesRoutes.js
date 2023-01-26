const express = require("express");
const router = express.Router();
const {
  addBoughtCourse,
  getUserBoughtCourses,
} = require("../controllers/boughtCourseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addBoughtCourse);
router.get("/:id", protect, getUserBoughtCourses);

module.exports = router;
