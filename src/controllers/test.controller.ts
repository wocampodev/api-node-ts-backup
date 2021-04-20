import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

import TestService from '../services/test.service';

@route('/')
export default class TestController {

    constructor( private readonly testService: TestService ) {}

    @GET()
    public index( req: Request, res: Response ): void {
        res.json({
            date: this.testService.get()
        });
    }

}