import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from './Reducers.js';
import { isProduction } from '../shared/environment.js';

export const ConfigureStore = () => {
    const store = createStore(
        productsReducer,
        applyMiddleware(thunk)
    );

    if (!isProduction)
        store.subscribe(() => console.log(store.getState()));

    return store;
};