import express from "express";
import controller from "../controllers/contactsControllers.js";
import jwtValidation from "../middleware/userware.js";
const jsonP = express.json();

const contactsRouter = express.Router();

contactsRouter.get("/", jwtValidation, controller.getAllContacts);

contactsRouter.get("/:id", controller.getOneContact);

contactsRouter.delete("/:id", controller.deleteContact);

contactsRouter.post("/", jsonP, controller.createContact);

contactsRouter.put("/:id", jsonP, controller.updateContact);

contactsRouter.patch("/:id/favorite", jsonP, controller.updateContact);

export default contactsRouter;
