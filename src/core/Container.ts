import { createContainer, asClass, AwilixContainer } from 'awilix';

import SubscriptionMySQLRepository from '../repositories/implementation/mysql/subscription-mysql.repository';
import SubscriptionService from '../services/subscription.service';

import TestService from '../services/test.service';

export default (): AwilixContainer => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        // Repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),

        // Services
        subscriptionService: asClass(SubscriptionService).scoped(),
        testService: asClass(TestService).scoped()
    });
    return container;
};