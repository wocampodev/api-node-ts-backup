import { MovementType } from '../../shared/domain/enums/movement.type';

interface MovementCreateDto {
    userId: number;
    type: MovementType;
    amount: number;
}

export { MovementCreateDto };
