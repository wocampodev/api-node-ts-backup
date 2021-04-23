import ApplicationException from "../../shared/domain/exceptions/application.exception";

import Movement from "../domain/movement";
import { MovementType } from "../../shared/domain/enums/movement.type";
import { MovementCreateDto } from "../domain/movement.dto";
import MovementRepository from "../domain/movement.repository";

import Balance from "../../balance/domain/balance";
import BalanceRepository from "../../balance/domain/balance.repository";

class MovementService {

    constructor(
        private readonly movementRepository: MovementRepository,
        private readonly balanceRepository: BalanceRepository
    ) {}

    public async find( id: number ): Promise<Movement | null> {
        return this.movementRepository.find( id );
    }

    public async all(): Promise<Movement[]> {
        return await this.movementRepository.all();
    }

    public async store( data: MovementCreateDto ): Promise<void | Error> {
        const balanceNow = await this.balanceRepository.findByUserId( data.user_id );
        
        if ( data.type === MovementType.income ) {
            await this.saveIncome( data, balanceNow );
            return;
        }

        if ( data.type === MovementType.outcome ) {
            await this.saveOutcome( data, balanceNow );
            return;
        }

        throw new ApplicationException('Movement type is invalid');
        
    }

    private async saveIncome( data: MovementCreateDto, balance: Balance | null ): Promise<void> {
        if ( !balance ) {
            const newBalance = {
                amount: data.amount,
                user_id: data.user_id
            };
            await this.balanceRepository.store( newBalance as Balance );
        } else {
            balance.amount += data.amount;
            await this.balanceRepository.update( balance );
        }
        await this.movementRepository.store( data as Movement );
    }

    private async saveOutcome( data: MovementCreateDto, balance: Balance | null ): Promise<void | Error> {
        if ( !balance || ( balance.amount <= data.amount ) ) {
            throw new ApplicationException('User does not have enough balance');
        }
        balance.amount -= data.amount;
        await this.balanceRepository.update( balance );
        await this.movementRepository.store( data as Movement );

    }

}

export default MovementService;