const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourse,
  getInstructorCourses,
  getAllCourses,
} = require("../controllers/courseController");

router.post("/create", createCourse);
router.get("/all", getAllCourses);
router.get("/:id", getCourse);
router.get("/instructor/:id", getInstructorCourses);

module.exports = router;
