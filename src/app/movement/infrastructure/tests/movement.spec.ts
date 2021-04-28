import assert from 'assert';
import { describe, it } from 'mocha';

import BalanceMockRepository from '../../../balance/infrastructure/persistence/mock/balance.repository';
import MovementService from '../../application/movement.service';
import { MovementCreateDto } from '../../domain/movement.dto';
import MovementMockRepository from '../persistence/mock/movement.repository';

const movementService = new MovementService(new MovementMockRepository(), new BalanceMockRepository());

describe('Movement.Service', () => {
    describe('Store', () => {
        it('Trying to register an income movement', async () => {
            await movementService.store({
                userId: 1,
                type: 0,
                amount: 200,
            } as MovementCreateDto);
        });
        it('Trying to register an outcome movement', async () => {
            await movementService.store({
                userId: 1,
                type: 1,
                amount: 100,
            } as MovementCreateDto);
        });
        it('Trying to register an outcome movement with insufficient balance', async () => {
            try {
                await movementService.store({
                    userId: 1,
                    type: 0,
                    amount: 200,
                } as MovementCreateDto);
            } catch (error) {
                assert.equal(error.message, 'User does not have enough balance');
            }
        });
        it('Trying to register an unexpected movement', async () => {
            try {
                await movementService.store({
                    userId: 1,
                    type: 9,
                    amount: 200,
                } as MovementCreateDto);
            } catch (error) {
                assert.equal(error.message, 'Movement type is invalid');
            }
        });
    });
});
