import { Router } from "express";
import Controller from "./auth.controller";
import { registerUserValidation, loginValidation } from "./auth.validators";

const user: Router = Router();
const controller = new Controller();

// Sign In
user.post("/authenticate", loginValidation, controller.authenticate);

// Register New User
user.post("/register", registerUserValidation, controller.register);

export default user;
