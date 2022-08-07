const mongodb = require('mongodb');
// Nodejs driver
module.exports = async function makeDb() {
  const MongoClient = mongodb.MongoClient;
  const url = 'mongodb://127.0.0.1:27017';
  const dbName = 'evergreen_dev';
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    // const db = await client.db(dbName).command({ ping: 1 });
    const db = await client.db(dbName);
    console.log('Connected successfully to server');
    db.makeId = makeIdFromString;
    return db;
  } catch (err) {
    throw new Error(err.message);
  }
};

function makeIdFromString(id) {
  return new mongodb.ObjectID(id);
}
