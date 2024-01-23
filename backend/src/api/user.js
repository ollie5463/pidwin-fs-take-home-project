import express from "express";
import login from "./user-login.js";
import signup from "./user-signup.js";
import changePassword from "./user-change-password.js";
import auth from "../utils/auth.js";
import wager from "../api/user-wager.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.post("/wager", auth, wager);

export default router;
