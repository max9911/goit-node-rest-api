import express from "express";
import controller from "../controllers/usersController.js";
const jsonP = express.json();

const usersRouter = express.Router();

usersRouter.post("/register", controller.register);

export default usersRouter;
