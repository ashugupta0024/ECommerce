import express from "express";
import {
	registerController,
	loginController,
	testController,
    forgotPasswordController,
	updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object     {seperate file mei routing karo to router ka object lagta hai}
const router = express.Router();

//routing

//REGISTER || Method Post
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//FORGOT PASSWORD || POST
router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protetcted User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
	res.status(200).send({ ok: true });
});

//protetcted Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
	res.status(200).send({ ok: true });
});

//Update Profile
router.put('/profile',requireSignIn,updateProfileController)
export default router;
