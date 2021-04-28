import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import Subscription from '../../domain/subscription';
import CommonEntity from '../../../shared/infrastructure/entities/common.entity';

@Entity({ name: 'wallet_subscription' })
class SubscriptionEntity extends CommonEntity implements Subscription {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'code', type: 'varchar', nullable: false })
    code: string;

    @Column({ name: 'user_id', type: 'numeric', nullable: false })
    userId: number;

    @Column({ name: 'amount', type: 'numeric', nullable: false })
    amount: number;

    @Column({ name: 'cron', type: 'varchar', nullable: false })
    cron: string;
}

export default SubscriptionEntity;
