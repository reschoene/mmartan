import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { productsReducer } from './Reducers.js';
import { isProduction } from '../shared/environment.js';

export const ConfigureStore = () => {
    let middlewares = [thunk];

    if (!isProduction)
        middlewares.push(logger);

    const store = createStore(
        productsReducer,
        applyMiddleware(...middlewares)
    );

    return store;
};