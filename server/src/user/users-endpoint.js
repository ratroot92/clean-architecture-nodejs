const { UniqueConstraintError, InvalidPropertyError, RequiredParameterError } = require('../helpers/errors');
const makeHttpError = require('../helpers/http-error');
const makeUser = require('./user');

module.exports = function makeUserEndpointHandler({ userList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case 'POST':
        return postContact(httpRequest);

      case 'GET':
        return getUser(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
    }
  };

  async function getUser(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const { max, before, after } = httpRequest.queryParams || {};

    const result = id ? await userList.findById({ userId: id }) : await userList.getItems({ max, before, after });
    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function postContact(httpRequest) {
    let userInfo = httpRequest.body;
    if (!userInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: 'Bad request. No POST body.',
      });
    }

    if (typeof httpRequest.body === 'string') {
      try {
        userInfo = JSON.parse(userInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: 'Bad request. POST body must be valid JSON.',
        });
      }
    }

    try {
      const user = makeContact(userInfo);
      const result = await userList.add(user);
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        data: JSON.stringify(result),
      };
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode: e instanceof UniqueConstraintError ? 409 : e instanceof InvalidPropertyError || e instanceof RequiredParameterError ? 400 : 500,
      });
    }
  }
};
