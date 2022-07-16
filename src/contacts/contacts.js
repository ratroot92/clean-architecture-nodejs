const requiredParam = require('../helpers/required-param');
const { InvalidPropertyError } = require('../helpers/errors');
const isValidEmail = require('../helpers/is-valid-email');
const upperFirst = require('../helpers/upper-first');

module.exports = function makeContact(contactInfo = requiredParam('contactInfo')) {
  const validContact = validate(contactInfo);
  const normalContact = normalize(contactInfo);
  return Object.freeze(normalContact);
};

function validate({ firstName = requiredParam('firstName'), lastName = requiredParam('lastName'), emailAddress = requiredParam('emailAddress'), ...otherInfo } = {}) {
  validateName('first', firstName);
  validateName('last', lastName);
  validateEmail(emailAddress);
  return { firstName, lastName, emailAddress, ...otherInfo };
}

function validateName(label, name) {
  if (name.length < 2) {
    throw new InvalidPropertyError(`A contact's ${label} name must be at least 2 chrachters long.`);
  }
}

function validateEmail(emailAddress) {
  if (!isValidEmail(emailAddress)) {
    throw new InvalidPropertyError(`Invalid contact email address.`);
  }
}

function normalize({ emailAddress, firstName, lastName, ...otherInfo }) {
  return {
    ...otherInfo,
    firstName: upperFirst(firstName),
    lastName: upperFirst(lastName),
    emailAddress: emailAddress.toLowerCase(),
  };
}
