import joi from 'joi';

export default {
    create: {
        body: joi.object({
            title: joi.string().min(3).max(255).required(),
            content: joi.string().min(1).required(),
        }),
    },

    update: {
        body: joi.object({
            title: joi.string().min(3).max(255).optional(),
            content: joi.string().min(1).optional(),
        }),
    },
};
