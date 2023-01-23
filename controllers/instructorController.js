const asyncHandler = require("express-async-handler");
const Instructor = require("../models/instructorModel");

// @desc add new instructor
// @route POST /instructor/signup
// @access Public
const addInstructor = asyncHandler(async (req, res) => {
  try {
    //checking all the require feilds are available
    const { name, email, short_bio, about, profile_img, social_urls } =
      req.body;
    if (
      !name ||
      !email ||
      !short_bio ||
      !about ||
      !profile_img ||
      !social_urls
    ) {
      res
        .status(400)
        .json({ success: false, message: "Please add all feilds" });
    }

    // Check if instructor exists
    const instructorExists = await Instructor.findOne({ email });
    if (instructorExists) {
      res
        .status(400)
        .json({ success: false, message: "Instructor already exists!" });
    }

    // Create instructor
    const instructor = await Instructor.create({
      name,
      email,
      short_bio,
      about,
      profile_img,
      social_urls,
    });

    if (instructor) {
      res.status(201).json({
        success: true,
        _id: instructor.id,
        name: instructor.name,
        email: instructor.email,
        short_bio: instructor.short_bio,
        about: instructor.about,
        profile_img: instructor.profile_img,
        soical_urls: instructor.soical_urls,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid Instructor Data" });
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({ success: false, message: error });
  }
});

// @desc Get Instructor data
// @route GET /instructor/:userid
// @access Public
const getInstructor = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  try {
    const instructor = await Instructor.findById({ _id });
    if (!instructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found!" });
    }
    res.status(200).json({ success: true, instructor });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

module.exports = {
  addInstructor,
  getInstructor,
};
