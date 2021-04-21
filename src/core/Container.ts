import { createContainer, asClass, AwilixContainer } from 'awilix';

import SubscriptionMySQLRepository from '../app/subscription/infrastructure/persistence/mysql/subscription.repository';
import SubscriptionService from '../app/subscription/application/subscription.service';

export default (): AwilixContainer => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        // Repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),

        // Services
        subscriptionService: asClass(SubscriptionService).scoped(),
    });
    return container;
};