import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Applicant", "Organization"],
    required: true,
  },
  profile: {
    bio: { type: String },

    interests: [{ type: String }],

    documents: { type: String }, //URL to documents file

    documentsOriginalName: { type: String },

    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },

    age: {
      type: Number,
      min: 10,
      max: 100,
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Other"],
    },
    income: {
      type: Number,
    },
    location: {
      type: String,
    },
    profilePhoto: {
        type:String,
        default:""
    },
  },
}, {timestamps:true});

export const User = mongoose.model("User",userSchema)