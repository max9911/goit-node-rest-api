import * as Joi from "../schemas/JoiSchemas.js";

import contactsService from "../services/contactsServices.js";

async function getAllContacts(req, res, next) {
  try {
    const result = await contactsService.listContacts();
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function getOneContact(req, res, next) {
  const id = req.params.id;

  try {
    const result = await contactsService.getContactById(id);
    if (!result) {
      return res.status(404).send({ message: "Not found" });
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
}

async function deleteContact(req, res, next) {
  const id = req.params.id;
  try {
    const data = await contactsService.removeContact(id);

    if (!data) {
      return res.status(404).send({ message: "Not found" });
    }

    res.send(data);
  } catch (err) {
    next(err);
  }
}

async function createContact(req, res, next) {
  const data = req.body;
  const valResult = Joi.createContactSchema.validate(data);
  if (typeof valResult.error !== "undefined") {
    return res.status(400).send({ message: valResult.error.message });
  }
  try {
    const result = await contactsService.addContact(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Server Error" });
  }
}

async function updateContact(req, res, next) {
  const data = {
    name: req.body.name ? req.body.name : undefined,
    email: req.body.email ? req.body.email : undefined,
    phone: req.body.phone ? req.body.phone : undefined,
    favorite: req.body.favorite ? req.body.favorite : undefined,
  };
  const valResult = Joi.updateContactSchema.validate(data);
  if (typeof valResult.error !== "undefined") {
    return res.status(400).send({ message: valResult.error.message });
  }
  const id = req.params.id;

  if (data.favorite) {
    try {
      const result = await contactsService.editContact(data, id);
      return res.send(result);
    } catch (err) {
      next(err);
    }
  }

  try {
    const result = await contactsService.editContact(data, id);
    if (result === null) {
      return res.status(404).send({ " message ": " Not found " });
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
