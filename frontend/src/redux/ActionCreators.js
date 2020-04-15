import * as ActionTypes from './ActionTypes';
import { getBaseUrl } from '../shared/baseUrl';

/** Request to the server the products that match the search term. 
 *  @param {int} pageNumber number of the result page to be returned
 *  @param {int} pageSize number of products per page
 *  @param {string} prodDescr search term to be compared with product descriptions
 * */
export const fetchProducts = (pageNumber, pageSize, prodDescr) => (dispatch) => {
    //start setting the state as loading
    dispatch(productsLoading(true));

    //sends a get request to the server
    return fetch(getBaseUrl()+`getProductCatalog?pageNumber=${pageNumber}&pageSize=${pageSize}&prodDescription=${prodDescr}`)
        .then(response => {
            //If ok, return its response
            if(response.ok){
                return response;
            }
            else {
                //When there is a response with error status. In this case throws an error with its details
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            //When there is no server response. Throw its error forward
            var errmess = new Error(error.message);
            throw errmess;
        })
        //On successfully getting the products, dispatches actions for storing its results
        //By adding products, the loading state is changed to false.
        .then(response => response.json())
        .then(prodCatalog => {
            dispatch(setTotalProducts(prodCatalog.totalProducts));
            dispatch(addProducts(prodCatalog.products));
        })
        //If any error occurred, dispatches an action to the store setting its error message
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

export const setTotalProducts = (totalProducts) => ({
    type: ActionTypes.SET_TOTAL_PRODUCTS,
    payload: totalProducts
})

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