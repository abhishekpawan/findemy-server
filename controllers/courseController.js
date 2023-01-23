const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const Instructor = require("../models/instructorModel");

// @desc Create new Course
// @route POST /course/create
// @access Public
const createCourse = asyncHandler(async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
    });
    await course.save();
    res.status(201).json({ success: true, course });
  } catch (error) {
    res.status(409).json({ success: false, message: error });
  }
});

// @desc Get Course data
// @route GET /courses/:id
// @access Public
const getCourse = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  try {
    const course = await Course.findById({ _id });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "course not found!" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// @desc Get All Courses data
// @route GET /courses/all
// @access Public
const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const allCourses = await Course.find();

    res.status(200).json({ success: true, allCourses });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// @desc Get Courses of a Particular instructor
// @route GET /courses/instructor/:id
// @access Public
const getInstructorCourses = asyncHandler(async (req, res) => {
  try {
    const instructor_id = req.params.id;
    const instructor = await Instructor.findById({ _id: instructor_id });

    if (!instructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not Found" });
    }
    const course = await Course.find({ instructor_id });
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "courses not found!" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
module.exports = {
  createCourse,
  getCourse,
  getInstructorCourses,
  getAllCourses,
};
