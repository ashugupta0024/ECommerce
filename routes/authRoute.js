import express from 'express'
import {RegisterController} from '../controllers/authController.js'
//router object     {seperate file mei routing karo to router ka object lagta hai}

const router = express.Router()

//routing
//REGISTER || Method Post
router.post('/register', RegisterController)
export default router ``;
