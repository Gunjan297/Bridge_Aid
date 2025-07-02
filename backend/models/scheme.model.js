import { application } from "express";
import mongoose, { Schema } from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },

    details: {
      type: String,
      // required: true,
    },
    eligibility: [
      {
        type: String,
      },
    ],
    applicationProcess: {
      type: String,
      // required: true,
    },
    documentsRequired: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Government", "Private", "NGO"],
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    applyLink: {
      type: String,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

export const Scheme = mongoose.model("Scheme", schemeSchema)