import { createContainer, asClass, AwilixContainer } from 'awilix';

import SubscriptionMySQLRepository from '../app/subscription/infrastructure/persistence/mysql/subscription.repository';
import SubscriptionService from '../app/subscription/application/subscription.service';
import MovementMySQLRepository from '../app/movement/infrastructure/persistence/mysql/movement.repository';
import BalanceMySQLRepository from '../app/balance/infrastructure/persistence/mysql/balance.repository';
import MovementService from '../app/movement/application/movement.service';

export default (): AwilixContainer => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        // Repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMySQLRepository).scoped(),

        // Services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped()
    });
    return container;
};