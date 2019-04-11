const Joi = require("joi");

module.exports = {
  createCountry: {
    body: {
      name: Joi.string().required(),
      alpha2Code: Joi.string()
        .regex(/^[A-Z]{2}$/)
        .required()
    }
  },
  updateCountry: {
    body: {
      name: Joi.string().required(),
      alpha2Code: Joi.string()
        .regex(/^[A-Z]{2}$/)
        .required()
    },
    params: {
      countryId: Joi.string()
        .hex()
        .required()
    }
  },
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
