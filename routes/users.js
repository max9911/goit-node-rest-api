import express from "express";
import controller from "../controllers/usersController.js";
import jwtValidation from "../middleware/userware.js";
const jsonP = express.json();

const usersRouter = express.Router();

usersRouter.post("/register", jsonP, controller.register);
usersRouter.post("/login", jsonP, controller.login);
usersRouter.post("/logout", jwtValidation, controller.logout);
usersRouter.get("/current", jwtValidation, controller.current);

export default usersRouter;
