const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

//filtering user data to hide private things (password, token,etc)
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};
//setting up relation to the other collection
// userSchema.virtual('expense', {
//     ref:'Expense',
//     localField: '_id',
//     foreignField: 'owner'
// })

//setting up relation to the other collection
// userSchema.virtual('income', {
//     ref:'Income',
//     localField: '_id',
//     foreignField: 'owner'
// })

// Delete user's tasks when user is removed
// userSchema.pre('remove', async function(next){
//     const user = this
//     await Task.deleteMany({owner: user._id})
//     next()
// })

module.exports = mongoose.model("User", userSchema);
