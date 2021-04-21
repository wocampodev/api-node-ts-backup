import MySQL from '../../../../../common/infrastructure/persistence/mysql.persistence';

import { SubscriptionRepository } from '../../../domain/subscription.repository';
import { Subscription } from '../../../domain/subscription';
import { SubscriptionCreateDto } from '../../../domain/subscription.dto';

class SubscriptionMySQLRepository implements SubscriptionRepository {
    
    public async all(): Promise<Subscription[]> {
        const [ data ] = await MySQL().execute(
            "SELECT * FROM wallet_subscription ORDER BY id DESC"
        );
        return data as Subscription[];
    }
    
    public async find( id: number ): Promise<Subscription | null> {
        const [ data ]: any[] = await MySQL().execute(
            'SELECT * FROM wallet_subscription WHERE id = ?',
            [ id ]
        );
        if ( !data.length ) {
            return null;
        }
        return data[0] as Subscription;
    }

    public async findByUserAndCode( user_id: number, code: string ): Promise<Subscription | null> {
        const [ data ]: any[] = await MySQL().execute(
            'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?',
            [ user_id, code ]
        );
        if ( !data.length ) {
            return null;
        }
        return data[0] as Subscription;
    }
    
    public async store( entry: SubscriptionCreateDto ): Promise<void> {
        const { user_id, code, amount, cron } = entry;
        await MySQL().execute(
            'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES( ?, ?, ?, ?, ? )',
            [ user_id, code, amount, cron, new Date() ]
        );
    }
    
    public async update( entry: any ): Promise<void> {
        const { id, user_id, code, amount, cron } = entry;
        await MySQL().execute(
            'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
            [ user_id, code, amount, cron, new Date(), id ]
        );
    }
    
    public async remove( id: number ): Promise<void> {
        await MySQL().execute(
            'DELETE FROM wallet_subscription WHERE id = ?',
            [ id ]
        );
    }

}

export default SubscriptionMySQLRepository;