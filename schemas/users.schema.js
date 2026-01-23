import Joi from 'joi';

export default {
    registration: {
        body: Joi.object({
            username: Joi.string().min(3).max(100).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        }),
    },

    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    },

    post: {
        body: Joi.object({
            title: Joi.string().min(3).required(),
            content: Joi.string().min(1).required(),
        })
    }
}