import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String, //Url to company logo
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
},{timestamps:true});

export const Organization = mongoose.model("Organization", organizationSchema);
