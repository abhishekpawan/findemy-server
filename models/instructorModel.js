const mongoose = require("mongoose");

const instructorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      trim: true,
      unique: true,
    },
    short_bio: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    profile_img: {
      type: String,
      required: true,
      trim: true,
    },
    social_urls: {
      type: Array,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//setting up relation to the course collection
// instructorSchema.virtual("course", {
//   ref: "Course",
//   localField: "_id",
//   foreignField: "owner",
// });
module.exports = mongoose.model("Instructor", instructorSchema);
