import { getRepository } from 'typeorm';

import Subscription from '../../../domain/subscription';
import { SubscriptionCreateDto } from '../../../domain/subscription.dto';
import SubscriptionRepository from '../../../domain/subscription.repository';
import SubscriptionEntity from '../../entities/subscription.entity';

class SubscriptionORMRepository implements SubscriptionRepository {
    private repository = getRepository(SubscriptionEntity);

    public async all(): Promise<Subscription[]> {
        const subscriptions = await this.repository.find();
        return subscriptions as Subscription[];
    }

    public async find(id: number): Promise<Subscription | null> {
        const subscription = await this.repository.findOne(id);
        if (!subscription) {
            return null;
        }
        return subscription as Subscription;
    }

    public async findByUserAndCode(userId: number, code: string): Promise<Subscription | null> {
        const subscription = await this.repository.findOne({
            where: { code, userId },
        });
        if (!subscription) {
            return null;
        }
        return subscription as Subscription;
    }

    public async store(entry: SubscriptionCreateDto): Promise<void> {
        const { userId, code, amount, cron } = entry;
        const subscription = this.repository.create({
            userId,
            code,
            amount,
            cron,
            createdAt: new Date(),
        });
        await this.repository.save(subscription);
    }

    public async update(entry: Subscription): Promise<void> {
        const { id, userId, code, amount, cron } = entry;
        await this.repository.update(id, {
            userId,
            code,
            amount,
            cron,
            updatedAt: new Date(),
        });
    }

    public async remove(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default SubscriptionORMRepository;
