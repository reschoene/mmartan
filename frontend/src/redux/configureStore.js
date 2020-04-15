import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { productsReducer } from './Reducers.js';
import { isProduction } from '../shared/environment.js';

/** Create, configure and returns a redux store */
export const ConfigureStore = () => {
    /** I use two middlewares for redux. The first is redux thunk, which allows me to have action creators that return
        a function instead of an object. Useful for asynchronous requests. */
    let middlewares = [thunk];

    /** Logger is the second one. In development environment, I leave it active to maintain traceability of all
        actions sent (dispatch) to the store and their respective states. */
    if (!isProduction)
        middlewares.push(logger);

    const store = createStore(
        productsReducer,
        applyMiddleware(...middlewares)
    );

    return store;
};