import * as ActionTypes from './ActionTypes';

export const productsReducer = (state = {
        pageSize: 16,
        pageNumber: 1,
        searchFilter: '',
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
        case ActionTypes.SET_PAGE_SIZE:
            return {...state, pageSize: action.payload};
        case ActionTypes.SET_PAGE_NUMBER:
            return {...state, pageNumber: action.payload};
            case ActionTypes.SET_SEARCH_FILTER:
                return {...state, searchFilter: action.payload};
        default: 
            return state;
    }
}