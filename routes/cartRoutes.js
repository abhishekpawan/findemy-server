const express = require("express");
const router = express.Router();
const {
  addCourseToCart,
  getUserCartCourses,
  deleteCartCourse,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addCourseToCart);
router.get("/user/:id", protect, getUserCartCourses);
router.delete("/:id", protect, deleteCartCourse);

module.exports = router;
