import MySQL from '../../../../shared/infrastructure/persistence/mysql.persistence';

import Balance from '../../../domain/balance';
import BalanceRepository from '../../../domain/balance.repository';

class BalanceMySQLRepository implements BalanceRepository {
    public async findByUserId(userId: number): Promise<Balance | null> {
        const [data]: any[] = await MySQL().execute('SELECT * FROM wallet_balance WHERE user_id = ?', [userId]);

        if (!data.length) {
            return null;
        }
        return data[0] as Balance;
    }

    public async find(id: number): Promise<Balance | null> {
        const [data]: any[] = await MySQL().execute('SELECT * FROM wallet_balance WHERE id = ?', [id]);

        if (!data.length) {
            return null;
        }
        return data[0] as Balance;
    }

    public async all(): Promise<Balance[]> {
        const [data]: any[] = await MySQL().execute('SELECT * FROM wallet_balance ORDER BY id DESC');

        return data as Balance[];
    }

    public async store(entry: Balance): Promise<void> {
        const { userId, amount } = entry;
        await MySQL().execute('INSERT INTO wallet_balance(user_id, amount, created_at) VALUES( ?, ?, ? )', [
            userId,
            amount,
            new Date(),
        ]);
    }

    public async update(entry: Balance): Promise<void> {
        const { id, userId, amount } = entry;
        await MySQL().execute('UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at = ? WHERE id = ?', [
            userId,
            amount,
            new Date(),
            id,
        ]);
    }

    public async remove(id: number): Promise<void> {
        await MySQL().execute('DELETE FROM wallet_balance WHERE id = ?', [id]);
    }
}

export default BalanceMySQLRepository;
