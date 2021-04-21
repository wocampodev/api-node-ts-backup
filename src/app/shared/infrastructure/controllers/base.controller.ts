import { Response } from "express";

import ApplicationException from "../../domain/exceptions/application.exception";

abstract class BaseController {

    handleException( error: Error, res: Response ): void | Error {
        if ( error instanceof ApplicationException ) {
            res.status(400).json(error);
        } else {
            throw new Error();
        }
    }

}

export default BaseController;