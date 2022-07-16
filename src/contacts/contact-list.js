const makeContact = require('./contacts');
const { UniqueConstraintError } = require('../helpers/errors');

module.exports = function makeContactList({ database }) {
  return Object.freeze({
    add,
    findByEmail,
    findById,
    getItems,
    remove,
    replace,
    update,
  });
};

async function getItems({ max = 100, before, after } = {}) {
  const db = await database;
  const query = {};
  if (before || after) {
    query._id = {};
    query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id;
    query._id = after ? { ...query._id, $lt: db.makeId(after) } : query._id;
  }
  return (await db.collection('contacts').find('query').limit(Number(max)).toArray()).map(documentsToContacts);
}
