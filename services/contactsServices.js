import Contact from "../models/contact.js";

async function listContacts() {
  return await Contact.find();
}

async function getContactById(id) {
  return await Contact.findById(id);
}

async function removeContact(id) {
  return await Contact.findByIdAndDelete(id);
}

async function addContact(data) {
  return await Contact.create(data);
}

async function editContact(data, id) {
  return await Contact.findByIdAndUpdate(id, data, { returnDocument: "after" });
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
};
