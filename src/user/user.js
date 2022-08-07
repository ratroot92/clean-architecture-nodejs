const requiredParam = require('../helpers/required-param')
const { InvalidPropertyError, RequiredParameterError } = require('../helpers/errors')
const isValidEmail = require('../helpers/is-valid-email')
const upperFirst = require('../helpers/upper-first')
const Joi=require('joi')
Joi.objectId = require('joi-objectid')(Joi)

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
    const {value,error} = validate(userInfo)
    if(error){
    //  const errorMessage=error["details"][0].message.replace(/"/g,"");
     throw new RequiredParameterError(error["details"][0].context.key)
    }
    else{
    const normalUser = normalize(value)
    return Object.freeze(normalUser)
    }

  function validate(userInfo) {
   return  Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().min(8).max(14).required(),
      // password_confirmation: Joi.any()
      //   .valid(Joi.ref('password'))
      //   .required()
      //   .label('Confirm password')
      //   .messages({ 'any.only': '{{#label}} does not match' }),
      mobile: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      // role: Joi.objectId().required().custom(validationHelper.asyncValidation(Role.existById)),
      role: Joi.objectId().required(),

    }).validate(userInfo)
  }

    function normalize({ email, firstName, lastName, ...otherInfo }) {
        return {
            ...otherInfo,
            firstName:upperFirst(firstName),
            lastName:upperFirst(lastName),
            email: email.toLowerCase(),
        }
    }
}
