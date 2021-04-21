import ApplicationException from "../../../common/domain/exceptions/application.exception";

import { SubscriptionRepository } from "../domain/subscription.repository";
import { Subscription } from "../domain/subscription";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../domain/subscription.dto";

class SubscriptionService {

    constructor( private readonly subscriptionRepository: SubscriptionRepository ) {}

    public async all(): Promise<Subscription[]> {
        return await this.subscriptionRepository.all();
    }
    
    public async find( id: number ): Promise<Subscription | null> {
        return await this.subscriptionRepository.find( id );
    }
    
    public async store( data: SubscriptionCreateDto ): Promise<void> {
        const { user_id, code } = data;
        const originalSubscription = await this.subscriptionRepository.findByUserAndCode( user_id, code );

        if ( originalSubscription ) {
            throw new ApplicationException('User subscription already exists.');
        }

        await this.subscriptionRepository.store( data as Subscription );
    }
    
    public async update( id: number, data: SubscriptionUpdateDto ): Promise<void | Error> {
        const subscription = await this.subscriptionRepository.find( id );

        if ( !subscription ) {
            throw new ApplicationException('Subscription not found.');
        }

        subscription.code = data.code;
        subscription.amount = data.amount;
        subscription.cron = data.cron;

        await this.subscriptionRepository.update( subscription );
    }
    
    public async remove( id: number ): Promise<void> {
        await this.subscriptionRepository.remove( id );
    }

}

export default SubscriptionService;