const mongodb = require('mongodb');
// Nodejs driver
module.exports = async function makeDb() {
  const MongoClient = mongodb.MongoClient;
  const url = 'mongodb://127.0.0.1:27017';
  const dbName = 'evergreen_dev';
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const db = await client.db(dbName);
  db.makeId = makeIdFromString;
  return db;
};

function makeIdFromString(id) {
  return new mongodb.ObjectID(id);
}
