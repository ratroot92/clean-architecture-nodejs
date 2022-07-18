const requiredParam = require('../helpers/required-param');
const { InvalidPropertyError } = require('../helpers/errors');
const isValidEmail = require('../helpers/is-valid-email.js');
const upperFirst = require('../helpers/upper-first');

module.exports = function makeUser(userInfo = requiredParam('userInfo')) {
  const validUser = validate(userInfo);
  const normalUser = normalize(validUser);
  return Object.freeze(normalUser);

  function validate({ firstName = requiredParam('firstName'), lastName = requiredParam('lastName'), emailAddress = requiredParam('emailAddress'), ...otherInfo } = {}) {
    validateName('first', firstName);
    validateName('last', lastName);
    validateEmail(emailAddress);
    return { firstName, lastName, emailAddress, ...otherInfo };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(`A user's ${label} name must be at least 2 characters long.`);
    }
  }

  function validateEmail(emailAddress) {
    if (!isValidEmail(emailAddress)) {
      throw new InvalidPropertyError('Invalid user email address.');
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
};
