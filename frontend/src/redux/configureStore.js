import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { productsReducer } from './Reducers.js';
import { isProduction } from '../shared/environment.js';

//Cria, configura e retorna uma Store
export const ConfigureStore = () => {
    //Utilizo 2 middlewares para o redux. O primeiro, redux thunk, me permite ter action creators que retornam
    //uma função ao inves de objeto. Util para requisicoes assincronas.
    let middlewares = [thunk];

    //O segundo eh o logger. Em ambiente de desenvolvimento, o deixo ativo para manter rastreabilidade de todas as
    //acoes enviadas (dispatch) para o store e seus respectivos estados
    if (!isProduction)
        middlewares.push(logger);

    const store = createStore(
        productsReducer,
        applyMiddleware(...middlewares)
    );

    return store;
};