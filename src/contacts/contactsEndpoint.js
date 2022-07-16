const { UniqueConstraintError, InvalidPropertyError, RequiredParameterError } = require('../helpers/errors');
const makeHttpError = require('../helpers/httpError');
const makeContact = require('./contact');

// It is factory that creates a function that can handle contacts http requests
// Inject contactList
// Build something that is completely independent of any kind of framework
// Highly testable by injecting mock contact list
module.exports = function makeContacstEndpointHanlder({ contactList }) {
  // This 'handle' function gets a generic http message and formulates a specific http response
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postContact(httpRequest);
      case 'GET':
        return getContacts(httpRequest);
      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };
};

async function getContacts(httpRequest) {
  const { id } = httpRequest.pathParams || {};
  const { max, before, after } = httpRequest.querParams || {};

  const result = id ? await contactList.findById({ contactId: id }) : await contactList.getItems({ max, before, after });
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode: 200,
    data: JSON.stringify(result),
  };
}

async function postContact(httpRequest) {
  let contactInfo = httpRequest.body;
  if (!contactInfo) {
    return makeHttpError({
      statusCode: 400,
      errorMessage: `Bad request. No POST body.`,
    });
  }
  if (typeof httpRequest.body === 'string') {
    try {
      contactInfo = JSON.parse(contactInfo);
    } catch (err) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: `Bad request. POST body must be a valid JSON`,
      });
    }
  }

  try {
    // All logic what makes a contact valid lives inside 'makeContact'
    const contact = makeContact(contactInfo);
    // All logic what adds a contact inside database  'contactList.add' method
    const result = await contactList.add(contact);
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 201,
      data: JSON.stringify(result),
    };
  } catch (err) {
    return makeHttpError({});
  }
}
