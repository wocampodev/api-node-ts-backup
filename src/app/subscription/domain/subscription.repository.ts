import Subscription from "./subscription";

interface SubscriptionRepository {
    
    all(): Promise<Subscription[]>;

    find( id: number ): Promise<Subscription | null>;

    findByUserAndCode( user_id: number, code: string ): Promise<Subscription | null>;

    store( subscription: Subscription ): Promise<void>;

    update( subscription: Subscription ): Promise<void>;

    remove( id: number ): Promise<void>;
    
}

export default SubscriptionRepository;