const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const passwordComplexity = require("joi-password-complexity");

// @desc Signup new user
// @route POST /users/signup
// @access Public
const signupUser = asyncHandler(async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    // //checking all the require feilds are available
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }

    // Hash the passowrd
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid User Data" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

// @desc Authenticate a user
// @route POST /users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    //checking all the require feilds are available
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please add all feilds" });
    }
    // check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        success: true,
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
});

// @desc Get all Users
// @route GET /api/users/
// @access Private
// const getUsers = asyncHandler(async (req, res) => {
//   const allUser = await User.find();

//   res.status(200).json(allUser);
// });

// @desc Get User data
// @route GET /users/:userid
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById({ _id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(409).json({ success: false, message: error });
  }
});

// @desc Update user data
// @route PUT /api/users/:id
// @access Private
// const updateUser = asyncHandler(async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates" });
//   }
//   try {
//     updates.forEach((update) => (req.user[update] = req.body[update]));
//     await req.user.save();
//     res.status(200).send(req.user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     res.status(400).send({error:"User not found"});
//   }

//   await user.remove()
//   res.status(200).json({id:req.params.id});s
// });

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//validating user's signup data
const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    imageurl: Joi.string().label("ImageURL"),
  });
  return schema.validate(data);
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  //   getUsers,
  //   deleteUser,
  //   updateUser,
};
