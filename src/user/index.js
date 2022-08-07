const makeDb = require('../db');
const makeUserList = require('./user-list');
const makeUsersEndpointHandler = require('./users-endpoint');

const database = makeDb();
const userList = makeUserList({ database });
const usersEndpointHandler = makeUsersEndpointHandler({ userList });

module.exports = usersEndpointHandler;
