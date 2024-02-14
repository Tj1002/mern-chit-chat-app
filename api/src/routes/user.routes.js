import express from "express";
import { getuser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/getusers").get(verifyJWT, getuser);
export default router;
