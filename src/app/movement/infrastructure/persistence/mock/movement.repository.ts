import DATABASE from '../../../../shared/infrastructure/persistence/mock.persistence';

import Movement from '../../../domain/movement';
import MovementRepository from '../../../domain/movement.repository';

class MovementMockRepository implements MovementRepository {
    public async find(id: number): Promise<Movement | null> {
        const table = DATABASE.movements as Movement[];
        const data = table.find((row) => row.id === id);
        if (!data) {
            return null;
        }
        return { ...data } as Movement;
    }

    public async all(): Promise<Movement[]> {
        const table = DATABASE.movements as Movement[];
        if (!table.length) {
            return [];
        }
        return [...table] as Movement[];
    }

    public async store(entry: Movement): Promise<void> {
        const { type, amount, userId } = entry;
        const table = DATABASE.movements as Movement[];
        DATABASE._movementId++;
        table.push({
            id: DATABASE._movementId,
            type,
            amount,
            userId,
            createdAt: new Date(),
            updatedAt: null,
        } as Movement);
    }

    public async update(entry: Movement): Promise<void> {
        const { id, type, amount, userId } = entry;
        const table = DATABASE.movements as Movement[];
        const movement = table.find((row) => row.id === id);
        if (movement) {
            movement.type = type;
            movement.userId = userId;
            movement.amount = amount;
            movement.updatedAt = new Date();
        }
    }

    public async remove(id: number): Promise<void> {
        const table = DATABASE.movements as Movement[];
        DATABASE.movements = table.filter((row) => row.id !== id);
    }
}

export default MovementMockRepository;
