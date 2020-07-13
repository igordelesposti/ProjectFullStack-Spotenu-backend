import express from "express";
import UserController  from "../controller/UserController";

const userRouter = express.Router();

userRouter.post("/signup", new UserController().signUp)
userRouter.post("/signupband", new UserController().signUpBand)
userRouter.post("/signupadministrator", new UserController().signUpAdministrator)
userRouter.post("/login", new UserController().login)

export default userRouter

