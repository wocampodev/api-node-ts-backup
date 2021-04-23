import DATABASE from '../../../../shared/infrastructure/persistence/mock.persistence';

import SubscriptionRepository from '../../../domain/subscription.repository';
import Subscription from '../../../domain/subscription';

class SubscriptionMockRepository implements SubscriptionRepository {

    public async find(id: number): Promise<Subscription | null> {
        const table = DATABASE.subscriptions as Subscription[];
        const result = table.find(x => x.id === id);

        if (result) {
            return Object.assign({ ...result });
        }

        return null;
    }

    public async findByUserAndCode(userId: number, code: string): Promise<Subscription | null> {
        const table = DATABASE.subscriptions as Subscription[];
        const result = table.find(x => x.user_id === userId && x.code === code);

        if (result) {
            return Object.assign({ ...result });;
        }

        return null;
    }

    public async all(): Promise<Subscription[]> {
        const table = DATABASE.subscriptions as Subscription[];
        return Object.assign([...table]);
    }

    public async store(entry: Subscription): Promise<void> {
        const table = DATABASE.subscriptions as Subscription[];
        const now = new Date();

        DATABASE._subscriptionId++;

        table.push({
            id: DATABASE._subscriptionId,
            code: entry.code,
            amount: entry.amount,
            user_id: entry.user_id,
            cron: entry.cron,
            created_at: now,
            updated_at: null,
        } as Subscription);
    }

    public async update(entry: Subscription): Promise<void> {
        const table = DATABASE.subscriptions as Subscription[];
        const now = new Date();

        let originalEntry = table.find(x => x.id === entry.id);

        if (originalEntry) {
            originalEntry.code = entry.code;
            originalEntry.user_id = entry.user_id;
            originalEntry.amount = entry.amount;
            originalEntry.cron = entry.cron;
            originalEntry.updated_at = now;
        }
    }

    public async remove(id: number): Promise<void> {
        let table = DATABASE.subscriptions as Subscription[];

        table = table.filter(x => x.id !== id);
    }

}

export default SubscriptionMockRepository;