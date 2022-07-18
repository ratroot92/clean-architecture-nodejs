const requiredParam = require('../helpers/required-param')
const { InvalidPropertyError } = require('../helpers/errors')
const isValidEmail = require('../helpers/is-valid-email')
const upperFirst = require('../helpers/upper-first')
const Joi=require('joi')
/**
 *
 * @param {*} userInfo
 * @returns
 * firstName:            ahmed
 * lastName:             kabeer
 * email                 ahmed@evergreen.,com
 * username:             maliksblr92
 * password:             pakistan123>$
 * mobile:               34441500542
 * confirmPassword       pakistan123>$
 */

module.exports = function makeUser(userInfo = requiredParam('userInfo')) {
    const validUser = validate(userInfo)
    const normalUser = normalize(validUser)
    return Object.freeze(normalUser)

  function validate(userInfo) {
    const  schema = Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().min(8).max(14).required(),
      password_confirmation: Joi.any()
        .valid(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
      mobile: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      role: Joi.objectId().required().custom(validationHelper.asyncValidation(Role.existById)),
    }).validate()
  }

    function normalize({ email, firstName, lastName, ...otherInfo }) {
        return {
            ...otherInfo,
            firstName
             upperFirst(firstName),
            lastName
             upperFirst(lastName),
            email: email.toLowerCase(),
        }
    }
}
