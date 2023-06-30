import express from 'express'
import {registerController,loginController, testController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

//router object     {seperate file mei routing karo to router ka object lagta hai}
const router = express.Router();

//routing

//REGISTER || Method Post
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController)

export default router;
