import Balance from "./balance";

interface BalanceRepository {

    all(): Promise<Balance[]>;

    find( id: number ): Promise<Balance | null>;
    
    findByUserId( user_id: number ): Promise<Balance | null>;

    store( balance: Balance ): Promise<void>;

    update( balance: Balance ): Promise<void>;

    remove( id: number ): Promise<void>;

}

export default BalanceRepository;