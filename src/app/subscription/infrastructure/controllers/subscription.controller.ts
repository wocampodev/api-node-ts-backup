import { Request, Response } from 'express';
import { route, GET, POST, PUT, DELETE } from 'awilix-express';

import BaseController from '../../../shared/infrastructure/controllers/base.controller';

import SubscriptionService from '../../application/subscription.service';
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../../domain/subscription.dto";

@route('/subscriptions')
class SubscriptionController extends BaseController {

    constructor( private readonly subscriptionService: SubscriptionService ) {
        super();
    }

    @GET()
    public async index( req: Request, res: Response ): Promise<Response> {
        try {
            const subscriptions = await this.subscriptionService.all();
            
            return res.status(200).json( subscriptions );
        } catch (error) {
            this.handleException( error, res );
        }
    }
    
    @route('/:id')
    @GET()
    public async find( req: Request, res: Response ): Promise<Response> {
        try {
            const id = parseInt( req.params.id );
            const subscription = await this.subscriptionService.find( id );

            if ( !subscription ) {
                return res.status(404).json({
                    msg: 'Subscription not found'
                });
            }
            return res.status(200).json( subscription );
        } catch (error) {
            this.handleException( error, res );
        }
    }

    @POST()
    public async store( req: Request, res: Response ): Promise<Response> {
        try {
            const { subscription } = req.body;
            await this.subscriptionService.store({
                code: subscription.code,
                user_id: subscription.user_id,
                amount: subscription.amount,
                cron: subscription.cron,
            } as SubscriptionCreateDto );

            return res.status(201).json({
                message: 'Subscription created'
            });
        } catch (error) {
            this.handleException( error, res );
        }
    }

    @route('/:id')
    @PUT()
    public async update( req: Request, res: Response ): Promise<Response> {
        try {
            const id = parseInt( req.params.id );
            const { subscription } = req.body;
            await this.subscriptionService.update( id, {
                code: subscription.code,
                amount: subscription.amount,
                cron: subscription.cron,
            } as SubscriptionUpdateDto );

            return res.status(200).json({
                message: 'Subscription updated'
            });
        } catch (error) {
            this.handleException( error, res );
        }
    }

    @route('/:id')
    @DELETE()
    public async delete( req: Request, res: Response ): Promise<Response> {
        try {
            const id = parseInt( req.params.id );
            await this.subscriptionService.remove( id );

            return res.status(200).json({
                message: 'Subscription deleted'
            });
        } catch (error) {
            this.handleException( error, res );
        }
    }

}

export default SubscriptionController;