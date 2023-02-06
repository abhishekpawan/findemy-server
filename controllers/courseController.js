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

// @desc Get searched Courses data
// @route GET /courses?skip=0&limit=10&search=""
// @access Public
const getSearchCourses = asyncHandler(async (req, res) => {
  try {
    const { search, limit, skip, levels, ratings } = req.query;
    let finalSearchResult = [];
    const searchResultbyText = await Course.find({
      $text: { $search: search },
    });
    finalSearchResult = searchResultbyText;

    if (levels) {
      const level = levels.split(",");

      let totalFilteredCoursesByLevel = [];
      for (let i = 0; i < level.length; i++) {
        const filteredCoursesByLevel = finalSearchResult.filter((course) => {
          return course.level === level[i];
        });
        totalFilteredCoursesByLevel = totalFilteredCoursesByLevel.concat(
          filteredCoursesByLevel
        );
      }

      finalSearchResult = totalFilteredCoursesByLevel;
    }

    if (ratings) {
      const rating = ratings.split(",");

      let totalFilteredCoursesByRating = [];
      for (let i = 0; i < rating.length; i++) {
        const filteredCoursesByRating = finalSearchResult.filter((course) => {
          return course.rating >= parseFloat(rating[i]);
        });
        totalFilteredCoursesByRating = totalFilteredCoursesByRating.concat(
          filteredCoursesByRating
        );
      }

      finalSearchResult = totalFilteredCoursesByRating;

      finalSearchResult = finalSearchResult.filter((SearchResult, index) => {
        return finalSearchResult.indexOf(SearchResult) === index;
      });
    }

    const totalPage = Math.ceil(finalSearchResult.length / parseInt(limit));

    const currentPage =
      parseInt(skip) === 0 ? 1 : parseInt(skip) / parseInt(limit) + 1;

    // const courses = await Course.find({
    //   $text: { $search: search.toString() },
    // })
    //   .skip(skip)
    //   .limit(limit);

    res.status(200).json({
      success: true,
      courses: finalSearchResult,
      totalSearchResult: finalSearchResult.length,
      totalPage,
      currentPage,
    });
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
  getSearchCourses,
  getInstructorCourses,
  getAllCourses,
};
