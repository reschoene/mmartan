import * as ActionTypes from './ActionTypes';
import { getBaseUrl } from '../shared/baseUrl';

export const fetchProducts = (pageNumber, pageSize, prodDescr) => (dispatch) => {
    dispatch(productsLoading(true));

    return fetch(getBaseUrl()+`getProductCatalog?pageNumber=${pageNumber}&pageSize=${pageSize}&prodDescription=${prodDescr}`)
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(prodCatalog => {
            dispatch(setTotalProducts(prodCatalog.totalProducts));
            dispatch(addProducts(prodCatalog.products));
        })
        .catch(error => dispatch(productsFailed(error.message)));
}

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errMsg) => ({
    type: ActionTypes.PRODUCTS_FAILED,
    payload: errMsg
});

export const addProducts = (products) => ({
    type: ActionTypes.ADD_PRODUCTS,
    payload: products
});

export const setPageSize = (pageSize) => ({
    type: ActionTypes.SET_PAGE_SIZE,
    payload: pageSize
});

export const setPageNumber = (pageNumber) => ({
    type: ActionTypes.SET_PAGE_NUMBER,
    payload: pageNumber
});

export const setSearchFilter = (searchFilter) => ({
    type: ActionTypes.SET_SEARCH_FILTER,
    payload: searchFilter
});

export const setTotalProducts = (totalProducts) => ({
    type: ActionTypes.SET_TOTAL_PRODUCTS,
    payload: totalProducts
})