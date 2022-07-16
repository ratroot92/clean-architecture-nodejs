const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const adaptRequest = require('./helpers/adaptRequest');
require('dotenv').config({ path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`) });
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/contacts', contactsController);
app.get('/contacts/:id', contactsController);

function contactsController(req, res) {
  const httpRequest = adaptRequest(req);
  handleContactRequest(httpRequest).then(({ headers, statusCode, data }) => res.set(headers).status(statusCode).send(data));
}

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => console.log(`server listening at ${HOST}:${PORT}[${process.env.NODE_ENV}]`));
