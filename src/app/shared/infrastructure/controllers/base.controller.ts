import { Response } from 'express';

import ApplicationException from '../../domain/exceptions/application.exception';

abstract class BaseController {
    handleException(error: Error, res: Response): Response {
        if (error instanceof ApplicationException) {
            return res.status(400).json({
                ok: false,
                message: error.message,
            });
        } else {
            return res.status(500).json({
                ok: false,
                message: error.message,
            });
        }
    }
}

export default BaseController;
