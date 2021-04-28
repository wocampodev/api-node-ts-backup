import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

abstract class CommonEntity {
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date | null;
}

export default CommonEntity;
