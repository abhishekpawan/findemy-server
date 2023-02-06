const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    course_id: {
      type: String,
      required: true,
      trim: true,
    },
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    instructor_id: {
      type: String,
      required: true,
      trim: true,
    },
    instructor_name: {
      type: String,
      required: false,
      trim: true,
    },
    original_price: {
      type: Number,
      required: true,
      trim: true,
    },
    discounted_price: {
      type: Number,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    num_students: {
      type: String,
      required: true,
      trim: true,
    },
    num_reviews: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: false,
      trim: true,
    },
    tag: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    course_thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    course_video: {
      type: String,
      required: true,
      trim: true,
    },
    requirements: {
      type: Array,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    short_description: {
      type: String,
      required: true,
      trim: true,
    },
    learning_point: {
      type: Array,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", cartSchema);
