const fs = require('fs/promises')
const path = require('path');
const shortid = require('shortid')

const contactsPath = path.join(__dirname, '/db/contact.json')

async function getContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data)
}

function writeNewList(initialList, newList) {
  return fs.writeFile(initialList, newList, 'utf-8', (err) => { if (err) console.error(err) })
}

async function listContacts() {
  try {
    console.table(await getContacts())  
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
    try {
      const contacts = await getContacts()
      const findedContact = contacts.find(contact => contact.id === contactId)
     console.log(findedContact);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
    try {
      const contacts = await getContacts()
      const filteredContacts = contacts.filter(contact => contact.id !== contactId)
      const contactsList = JSON.stringify(filteredContacts, null, '\t')
      writeNewList(contactsPath, contactsList)
      console.log(`contact with ID: ${contactId} deleted from Contact List`);
      listContacts()
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
    try {
      const contacts = await getContacts()
      const contactNew = { id: shortid.generate(), name, email, phone }
      const contactsList = JSON.stringify([contactNew, ...contacts], null, '\t')
      writeNewList(contactsPath, contactsList)
      console.log(`contact ${name} added to Contact List`);
      listContacts()
    } catch (error) {
        console.log(error);
    }
}
  
module.exports = {listContacts, getContactById, removeContact, addContact}