import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

abstract class CommonEntity {

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date | null;

}

export default CommonEntity;