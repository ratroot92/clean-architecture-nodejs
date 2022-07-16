const makeDb = require('../db');
const makeContactList = require('./contactList');
const makeContacstEndpointHanlder = require('./contactList');

const database = makeDb();
const contactList = makeContactList({ database });
const contactsEndpointHandler = makeContacstEndpointHanlder({ contactList });

module.exports = contactsEndpointHandler;
