import Movement from './movement';

interface MovementRepository {
    all(): Promise<Movement[]>;

    find(id: number): Promise<Movement | null>;

    store(Movement: Movement): Promise<void>;

    update(Movement: Movement): Promise<void>;

    remove(id: number): Promise<void>;
}

export default MovementRepository;
