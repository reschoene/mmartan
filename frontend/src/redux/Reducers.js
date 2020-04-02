import * as ActionTypes from './ActionTypes';

export const productsReducer = (state = {
        isLoading: true,
        errMsg: null,
        products: []
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_PRODUCTS:
            return {...state, isLoading: false, errMsg: null, products: action.payload};
        case ActionTypes.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMsg: null, products: []};
        case ActionTypes.PRODUCTS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, products: []};
        default: 
            return state;
    }
}