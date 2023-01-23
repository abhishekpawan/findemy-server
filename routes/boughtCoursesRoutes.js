const express = require("express");
const router = express.Router();
const { addBoughtCourse } = require("../controllers/boughtCourseController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addBoughtCourse);
// router.get("/user/:id", protect, getUserCartCourses);
// router.delete("/:id", protect, deleteCartCourse);

module.exports = router;
