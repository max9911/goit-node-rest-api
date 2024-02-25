const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

async function writeContacts(data) {
  return await fs.writeFile(contactsPath, JSON.stringify(data, undefined, 1));
}

async function listContacts() {
  const data = await readContacts();
  return data;
}

async function getContactById(contactId) {
  const data = await readContacts();
  const result = data.find((obj) => obj.id === contactId);
  if (result === undefined) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const data = await readContacts();
  const index = data.findIndex((obj) => obj.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedObj = data[index];
  const result = data.filter((obj) => obj.id !== contactId);
  await writeContacts(result);
  return removedObj;
}

async function addContact({ name, email, phone }) {
  const data = await readContacts();
  const idx = data.findIndex((el) => el.name === name);

  if (idx === -1) {
    const newObj = { name, email, phone, id: crypto.randomUUID() };
    data.push(newObj);
    await writeContacts(data);
    return newObj;
  }
  return { message: "The contact is already in Contacts List" };
}

async function editContact(contact, id) {
  const data = await readContacts();
  const index = data.findIndex((obj) => obj.id === id);
  if (index === -1) {
    return "error";
  }
  const oldContact = data[index];

  data[index].name = contact.name ? contact.name : oldContact.name;
  data[index].email = contact.email ? contact.email : oldContact.email;
  data[index].phone = contact.phone ? contact.phone : oldContact.phone;

  await writeContacts(data);
  return data[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  editContact,
};
