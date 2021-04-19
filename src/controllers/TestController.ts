import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

import TestService from '../services/TestService';

@route('/')
export default class TestController {

    constructor( private readonly testService: TestService ) {}

    @GET()
    public index( req: Request, res: Response ): void {
        res.json({
            msg: 'aayayay',
            test: 'test',
            date: this.testService.get()
        });
    }

}