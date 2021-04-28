import { Request, Response } from 'express';
import { route, GET, POST } from 'awilix-express';

import BaseController from '../../../shared/infrastructure/controllers/base.controller';
import MovementService from '../../application/movement.service';
import { MovementCreateDto } from '../../domain/movement.dto';

@route('/movements')
class MovementController extends BaseController {
    constructor(private readonly movementService: MovementService) {
        super();
    }

    @GET()
    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const movements = await this.movementService.all();

            return res.status(200).json(movements);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const movement = await this.movementService.find(id);

            if (!movement) {
                return res.status(404).json({
                    msg: 'Movement not found',
                });
            }
            return res.status(200).json(movement);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response): Promise<Response> {
        try {
            const { movement } = req.body;
            await this.movementService.store({
                userId: movement.userId,
                type: movement.type,
                amount: movement.amount,
            } as MovementCreateDto);

            return res.status(201).json({
                message: 'Movement created',
            });
        } catch (error) {
            this.handleException(error, res);
        }
    }
}

export default MovementController;
