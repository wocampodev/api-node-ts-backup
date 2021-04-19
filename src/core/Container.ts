import { createContainer, asClass, AwilixContainer } from 'awilix';

import TestService from '../services/TestService';

export default (): AwilixContainer => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });
    container.register({
        testService: asClass(TestService).scoped()
    });
    return container;
};