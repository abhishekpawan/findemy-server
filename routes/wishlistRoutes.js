const express = require("express");
const router = express.Router();
const {
  addCourseToWishlist,
  getUserWishlistCourses,
  deleteWishlistCourse,
} = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addCourseToWishlist);
router.get("/user/:id", protect, getUserWishlistCourses);
router.delete("/:id", protect, deleteWishlistCourse);

module.exports = router;
