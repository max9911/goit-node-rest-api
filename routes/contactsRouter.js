import express from "express";
import controller from "../controllers/contactsControllers.js";
const jsonP = express.json();

const contactsRouter = express.Router();

contactsRouter.get("/", controller.getAllContacts);

contactsRouter.get("/:id", controller.getOneContact);

contactsRouter.delete("/:id", controller.deleteContact);

contactsRouter.post("/", jsonP, controller.createContact);

contactsRouter.put("/:id", jsonP, controller.updateContact);

contactsRouter.patch("/:id/favorite", jsonP, controller.updateContact);

export default contactsRouter;
