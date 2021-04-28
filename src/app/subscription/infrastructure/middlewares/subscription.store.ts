import { Request, Response } from 'express';
import requestOptions from '../../../shared/infrastructure/validations/request.options';
import SubscriptionStoreSchema from '../validations/subscription.store';

export default function validateSubscriptionStore(req: Request, res: Response, next: () => void): Response | void {
    const { error, value } = SubscriptionStoreSchema.validate(req.body.subscription, requestOptions);

    if (error) {
        const errors = error.details.map((err) => {
            return {
                message: err.message,
                field: err.context.key,
            };
        });
        return res.status(400).json({
            ok: false,
            errors,
        });
    } else {
        req.body.subscription = value;
        next();
    }
}
