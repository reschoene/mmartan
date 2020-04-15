import * as ActionTypes from './ActionTypes';

/** Main reducer function for product catalog. It controls all the states assumed by the redux store.
 *  Reducer is basically a pure function (it doesn't change its parameters values),
 *  that takes the previous state and an action, and returns the next state.
 */
export const productsReducer = (state = {
        pageSize: 16,
        pageNumber: 1,
        searchFilter: '',
        isLoading: true,
        errMsg: null,
        products: [],
        totalProducts: 0
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_PRODUCTS:
            return {...state, isLoading: false, errMsg: null, products: action.payload};
        case ActionTypes.PRODUCTS_LOADING:
            return {...state, isLoading: true, errMsg: null, products: []};
        case ActionTypes.PRODUCTS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, products: []};
        case ActionTypes.SET_PAGE_SIZE:
            return {...state, pageSize: action.payload};
        case ActionTypes.SET_PAGE_NUMBER:
            return {...state, pageNumber: action.payload};
        case ActionTypes.SET_SEARCH_FILTER:
            return {...state, searchFilter: action.payload};
        case ActionTypes.SET_TOTAL_PRODUCTS:
            return {...state, totalProducts: action.payload};
        default: 
            return state;
    }
}