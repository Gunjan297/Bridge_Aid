import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyScheme,
  getAppliedSchemes,
  getApplicants,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

try {
  router.route("/apply/:id").get(isAuthenticated, applyScheme);
  router.route("/get").get(isAuthenticated, getAppliedSchemes);
  router.route("/:id/applicants").get(isAuthenticated, getApplicants);
  router.route("/status/:id/update").post(isAuthenticated, updateStatus);
} catch (error) {
  console.log(error)
}

export default router;
