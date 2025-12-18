import express from "express";

const router = express.Router();
import { createCompany, loginUser, registerUser } from "../controllers/auth.controller.js";

router.route("/createCompany").post(createCompany);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


export { router as authRoutes };