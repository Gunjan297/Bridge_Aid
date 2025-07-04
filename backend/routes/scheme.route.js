import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminSchemes, getAllSchemes, getSchemeById, postScheme, updateScheme } from "../controllers/scheme.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postScheme);
router.route("/get").get(getAllSchemes);
router.route("/getadminschemes").get(isAuthenticated, getAdminSchemes);
router.route("/get/:id").get(isAuthenticated, getSchemeById);
router.route("/update/:id").put(isAuthenticated, updateScheme);
export default router;
