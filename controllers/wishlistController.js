const asyncHandler = require("express-async-handler");
const Wishlist = require("../models/wishlistModel");
const BoughtCourse = require("../models/boughtCourseModel");

const User = require("../models/userModel");
// const Instructor = require("../models/instructorModel");

// @desc add new Courses to wishlist
// @route POST /wishlist/add
// @access Private
const addCourseToWishlist = asyncHandler(async (req, res) => {
  try {
    //checking if course is already exist in wishlist
    const course_id = req.body.course_id;
    const user_id = req.body.user_id;
    const courseExistInWishlist = await Wishlist.find({ course_id, user_id });
    const courseExistInBoughtCourses = await BoughtCourse.find({
      user_id,
      course_id,
    });
    if (courseExistInWishlist.length !== 0) {
      return res
        .status(400)
        .json({ success: false, message: "Course already exist in wishlist!" });
    }
    if (courseExistInBoughtCourses.length !== 0) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this course",
      });
    }

    //adding course to wishlist
    const wishlistCourse = new Wishlist({
      ...req.body,
    });
    wishlistCourse.save();
    res.status(201).json({ success: true, wishlistCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// @desc Get wishlist Course data of a user
// @route GET /wishlist/user/:id
// @access Private
const getUserWishlistCourses = asyncHandler(async (req, res) => {
  try {
    //checking is user exist
    const _id = req.params.id;
    const user = await User.findById({ _id });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    const user_id = req.params.id;
    //getting all wishlist courses of a user
    const wishlistCourse = await Wishlist.find({ user_id });
    if (!wishlistCourse) {
      return res
        .status(404)
        .json({ success: false, message: "wishlist course not found!" });
    }
    res.status(200).json({ success: true, wishlistCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// @desc Delete wishlist course
// @route DELETE /wishlist/:id
// @access Private
const deleteWishlistCourse = asyncHandler(async (req, res) => {
  try {
    const _id = req.params.id;
    const wishlistCourse = await Wishlist.findOneAndDelete({
      _id,
      user_id: req.body.user_id,
    });
    if (!wishlistCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found in the wishlist!" });
    }
    res.status(200).json({
      success: true,
      wishlistCourse,
      message: "Course succesfully removed form the wishlist!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

module.exports = {
  addCourseToWishlist,
  getUserWishlistCourses,
  deleteWishlistCourse,
};
