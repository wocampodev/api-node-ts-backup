import { MovementType } from '../../shared/domain/enums/movement.type';

interface Movement {
    id: number;
    userId: number;
    type: MovementType;
    amount: number;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export default Movement;
