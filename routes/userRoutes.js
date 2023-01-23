const express = require("express");
const router = express.Router();
const {
  signupUser,
  loginUser,
  getUser,
  //   getUsers,
  //   deleteUser,
  //   updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/:id", protect, getUser);
// router.get("/",protect, getUsers);
// router.put('/:id',protect,updateUser)
// router.delete('/:id',protect, deleteUser)

module.exports = router;
