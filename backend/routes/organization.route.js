import express from "express"
import { registerOrg, getOrg, getOrgById, updateOrg } from "../controllers/organization.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js";

const router =  express.Router()

router.route("/register").post(isAuthenticated,registerOrg)
router.route("/get").get(isAuthenticated, getOrg);
router.route("/get/:id").get(isAuthenticated, getOrgById);
router.route("/update/:id").put(singleUpload, isAuthenticated, updateOrg);

export default router