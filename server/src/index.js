const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const adaptRequest = require('./helpers/adaptRequest');
const handleUserRequest = require('./user');
require('dotenv').config({ path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`) });
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/users', usersController);
app.get('/users/:id', usersController);

async function usersController(req, res) {
  const httpRequest = adaptRequest(req);
  handleUserRequest(httpRequest).then(({ headers, statusCode, data }) => {
    console.log('################################ ');
    console.log(' headers ==> ', headers);
    console.log(' statusCode ==> ', statusCode);
    console.log(' data ==> ', data);
    console.log('################################ ');

    // return res.set(headers).status(statusCode).send(data);
  });
}

app.use((err, req, res, next) => {
  console.log(err);
  let error = {};
  error.status = err.status || 500;
  error.message = err.message || 'somethoing went wrong.';
  return res.status(error.status).json({ message: error.message });
});

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => console.log(`server listening at ${HOST}:${PORT}[${process.env.NODE_ENV}]`));
