import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import Subscription from "../../domain/subscription";
import CommonEntity from "../../../shared/infrastructure/entities/common.entity";

@Entity({ name: "wallet_subscription" })
class SubscriptionEntity extends CommonEntity implements Subscription {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "code", type: "varchar", nullable: false })
    code: string;

    @Column({ name: "user_id", type: "numeric", nullable: false })
    user_id: number;

    @Column({ name: "amount", type: "numeric", nullable: false })
    amount: number;

    @Column({ name: "cron", type: "varchar", nullable: false })
    cron: string;

    // constructor(
    //     code: string,
    //     amount: number,
    //     cron: string,
    //     user_id?: number,
    //     updated_at?: Date | null
    // ) {
    //     super();
    //     this.code = code;
    //     this.amount = amount;
    //     this.cron = cron;
    //     this.user_id = user_id;
    //     this.updated_at = updated_at;
    //     this.created_at = new Date() || null;
    // }

}

export default SubscriptionEntity;
