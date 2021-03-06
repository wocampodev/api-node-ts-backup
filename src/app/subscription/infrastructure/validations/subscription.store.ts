import Joi from 'joi';

const SubscriptionStoreSchema = Joi.object({
    userId: Joi.number().integer().min(0).required(),

    cron: Joi.string().required(),

    code: Joi.string().required(),

    amount: Joi.number().precision(2).required(),
});

export default SubscriptionStoreSchema;
