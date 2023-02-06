const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const BoughtCourse = require("../models/boughtCourseModel");
const User = require("../models/userModel");

// @desc add Courses to boughtCourses
// @route POST /boughtcourse/add
// @access Private
const addBoughtCourse = asyncHandler(async (req, res) => {
  try {
    const allBoughtCourse = [];

    for (const course of req.body) {
      // }
      // for (let i = 0; i < .length; i++) {
      const course_id = course.course_id;
      const user_id = course.user_id;
      const courseExistInCart = await Cart.find({ user_id,course_id });
      if (course.bought === false) {
        return res.status(400).json({
          success: false,
          message: "Course purchase failed!",
        });
      } else if (courseExistInCart && course.bought === true) {
        //adding course to cart
        const boughtCourse = new BoughtCourse({
          ...course,
        });
        boughtCourse.save();
        allBoughtCourse.push(boughtCourse);


        //deleting course from cart after successful purchase
        await Cart.findOneAndDelete({ _id:courseExistInCart[0]._id});
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Course doesn't exist in cart" });
      }
    }
    return res.status(201).json({
      success: true,
      allBoughtCourse,
      message: "Course successfully purchased!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// @desc Get cart Course data of a user
// @route GET /cart/user/:id
// @access Private
const getUserBoughtCourses = asyncHandler(async (req, res) => {
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
    //getting all cart courses of a user
    const boughtCourse = await BoughtCourse.find({ user_id });
    if (!boughtCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Purchased course not found!" });
    }
    res.status(200).json({ success: true, boughtCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// @desc Delete cart course
// @route DELETE /cart/:id
// @access Private
// const deleteCartCourse = asyncHandler(async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const cartCourse = await Cart.findOneAndDelete({
//       _id,
//       user_id: req.body.user_id,
//     });
//     if (!cartCourse) {
//       return res
//         .status(404)
//         .json({ succes: false, message: "Course not found in the cart!" });
//     }
//     res.status(200).json({
//       succes: true,
//       cartCourse,
//       message: "Course succesfully removed form the cart!",
//     });
//   } catch (error) {
//     res.status(500).json({ succes: false, message: error });
//   }
// });

module.exports = {
  addBoughtCourse,
  getUserBoughtCourses,
  //   deleteCartCourse,
};
