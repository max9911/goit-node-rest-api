import * as contactsService from "../services/contactsServices.cjs";
import * as validate from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res) => {
  try {
    const data = await contactsService.listContacts();
    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await contactsService.getContactById(id);
    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await contactsService.removeContact(id);

    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }
    console.log(data);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

export const createContact = async (req, res) => {
  try {
    const data = req.body;
    const valResult = validate.createContactSchema.validate(data);
    if (typeof valResult.error !== "undefined") {
      return res.status(400).send({ message: valResult.error.message });
    }
    const result = await contactsService.addContact(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};

export const updateContact = async (req, res) => {
  const id = req.params.id;
  try {
    const data = req.body;
    const valResult = validate.updateContactSchema.validate(data);
    if (typeof valResult.error !== "undefined") {
      return res.status(400).send({ message: valResult.error.message });
    }
    const result = await contactsService.editContact(data, id);
    if (result === "error") {
      return res.status(404).send({ message: "Not found" });
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
};
