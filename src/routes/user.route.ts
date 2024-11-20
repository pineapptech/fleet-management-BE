import express, { Router } from 'express';
import userController from "../controllers/user.controller";

const userRoute: Router = express.Router()

userRoute.post('/register', userController.registerUser)

userRoute.route('/login').post(userController.login)
        
export default userRoute;