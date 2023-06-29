import express from 'express'
import {registerController} from '../controllers/authController.js'

//router object     {seperate file mei routing karo to router ka object lagta hai}
const router = express.Router()

//routing
//REGISTER || Method Post
router.post('/register', registerController)
export default router;
