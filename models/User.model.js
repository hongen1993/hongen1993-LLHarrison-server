const { Schema, model } = require("mongoose");
const { ENUM_ROLES, USER } = require('../const/user.const');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required."],
    },
    surname: {
      type: String,
      required: [true, "Surname is required."],
      trim: true,
    },
    birthdate: {
      type: Date,
      required: [true, "Date of birth is required."],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Phone number is required."],
    },
    role: {
      type: String,
      enum: ENUM_ROLES,
      trim: true,
      default: USER
    },
    favourites: [{
      title: String,
      imageUrl: String,
      propertyId: String
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
