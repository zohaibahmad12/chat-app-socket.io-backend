import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [1, "Name is required"],
    maxlength: [100, "Name must be less than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"], // Email regex for basic validation
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [50, "Password must be less than 50 characters"],
    validate: {
      validator: function (value) {
        return (
          /[a-z]/.test(value) && // At least one lowercase letter
          /[A-Z]/.test(value) && // At least one uppercase letter
          /\d/.test(value) && // At least one number
          /[^a-zA-Z0-9]/.test(value)
        ); // At least one special character
      },
      message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
