import express from "express";
import {
	registerController,
	loginController,
	testController,
    forgotPasswordController,
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

//protetcted route auth
router.get("/user-auth", requireSignIn, (req, res) => {
	res.status(200).send({ ok: true });
});
export default router;
