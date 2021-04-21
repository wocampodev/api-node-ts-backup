import MySQL from '../../../../shared/infrastructure/persistence/mysql.persistence';

import Movement from "../../../domain/movement";
import MovementRepository from "../../../domain/movement.repository";

class MovementMySQLRepository implements MovementRepository {

    public async find( id: number ): Promise<Movement | null> {
        const [ data ]: any[] = await MySQL().execute(
            'SELECT * FROM wallet_movement WHERE id = ?',
            [ id ]
        );

        if( !data.length ) {
            return null;
        }
        return data[0] as Movement;
    }

    public async all(): Promise<Movement[]> {
        const [ data ]: any[] = await MySQL().execute(
            'SELECT * FROM wallet_movement ORDER BY id DESC'
        );

        return data as Movement[];
    }

    public async store( entry: Movement ): Promise<void> {

        const { user_id, type, amount } = entry;
        await MySQL().execute(
            'INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES( ?, ?, ?, ? )',
            [ user_id, type, amount, new Date() ]
        );
    }

    public async update( entry: Movement ): Promise<void> {
        const { id, user_id, type, amount } = entry;
        await MySQL().execute(
            'UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, updated_at = ? WHERE id = ?',
            [ user_id, type, amount, new Date(), id ]
        );
    }

    public async remove( id: number ): Promise<void> {
        await MySQL().execute(
            'DELETE FROM wallet_movement WHERE id = ?',
            [ id ]
        );
    }

}

export default MovementMySQLRepository;