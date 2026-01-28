import joi from 'joi';

export default {
  registration: {
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).max(32).required(),
      dob: joi.date().required(),
      first_name: joi.string().required(),
      last_name: joi.string().required(),
    }),
  },

  login: {
    body: joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).max(32).required(),
    }),
  },
}
