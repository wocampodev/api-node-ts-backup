import DATABASE from '../../../../shared/infrastructure/persistence/mock.persistence';

import Balance from '../../../domain/balance';
import BalanceRepository from '../../../domain/balance.repository';

class BalanceMockRepository implements BalanceRepository {
    public async find(id: number): Promise<Balance | null> {
        const table = DATABASE.balances as Balance[];
        const data = table.find((row) => row.id === id);
        if (!data) {
            return null;
        }
        return Object.assign({ ...data });
    }

    public async findByUserId(userId: number): Promise<Balance | null> {
        const table = DATABASE.balances as Balance[];
        const data = table.find((row) => row.userId === userId);
        if (!data) {
            return null;
        }
        return Object.assign({ ...data });
    }

    public async all(): Promise<Balance[]> {
        const table = DATABASE.balances as Balance[];
        return Object.assign([...table]);
    }

    public async store(entry: Balance): Promise<void> {
        const table = DATABASE.balances as Balance[];
        DATABASE._balanceId++;
        table.push({
            id: DATABASE._balanceId,
            amount: entry.amount,
            userId: entry.userId,
            createdAt: new Date(),
            updatedAt: null,
        } as Balance);
    }

    public async update(entry: Balance): Promise<void> {
        const table = DATABASE.balances as Balance[];
        const originalEntry = table.find((row) => row.id === entry.id);

        if (originalEntry) {
            originalEntry.userId = entry.userId;
            originalEntry.amount = entry.amount;
            originalEntry.updatedAt = new Date();
        }
    }

    public async remove(id: number): Promise<void> {
        const table = DATABASE.balances as Balance[];
        DATABASE.balances = table.filter((row) => row.id !== id);
    }
}

export default BalanceMockRepository;
