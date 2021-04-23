import DATABASE from '../../../../shared/infrastructure/persistence/mock.persistence';

import Balance from "../../../domain/balance";
import BalanceRepository from "../../../domain/balance.repository";

class BalanceMockRepository implements BalanceRepository {

    public async find( id: number ): Promise<Balance | null> {
        const table = DATABASE.balances as Balance[];
        const data = table.find( row => row.id === id );
        if ( !data ) {
            return null;
        }
        return Object.assign({ ...data });
        
    }
    
    public async findByUserId( user_id: number ): Promise<Balance | null> {
        const table = DATABASE.balances as Balance[];
        const data = table.find( row => row.user_id === user_id );
        if ( !data ) {
            return null;
        }
        return Object.assign({ ...data });;
    }
    
    public async all(): Promise<Balance[]> {
        const table = DATABASE.balances as Balance[];
        return Object.assign([ ...table ]);
    }
    
    public async store( entry: Balance ): Promise<void> {
        const table = DATABASE.balances as Balance[];
        DATABASE._balanceId++;
        table.push({
            id: DATABASE._balanceId,
            amount: entry.amount,
            user_id: entry.user_id,
            created_at: new Date(),
            updated_at: null
        } as Balance);
    }
    
    public async update( entry: Balance ): Promise<void> {
        const table = DATABASE.balances as Balance[];
        let originalEntry = table.find( row => row.id === entry.id );
    
        if ( originalEntry ) {
            originalEntry.user_id = entry.user_id;
            originalEntry.amount = entry.amount;
            originalEntry.updated_at = new Date();
        }
    }
    
    public async remove( id: number ): Promise<void> {
        let table = DATABASE.balances as Balance[];
        table = table.filter( row => row.id !== id );
    }

}

export default BalanceMockRepository;
