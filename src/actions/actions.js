import { productsItemAPI } from '../api/api';

export const TEST_ARR = 'TEST_ARR';
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const RESET_CURRENT_PAGE = 'RESET_CURRENT_PAGE';
export const SORT_BY_PRICE_HANDLER = 'SORT_BY_PRICE_HANDLER';
  
  
  const fetchProductsRequest = () => {
    return {
      type: FETCH_PRODUCTS_REQUEST,
    };
  };
  
  const fetchProductsSuccess = data => {
    return {
      type: FETCH_PRODUCTS_SUCCESS,
      data,
    };
  };
  
  const fetchProductsFailure = error => {
    return {
      type: FETCH_PRODUCTS_FAILURE,
      payload: error,
    };
  };
  
  export const fetchProductsTrigger = (categoryId, subCategoryId, page, sortOrder) => {
    return async dispatch => {
      dispatch(fetchProductsRequest());
  
      try {
        const data = await productsItemAPI.fetchProducts(categoryId, subCategoryId, page, sortOrder);
        dispatch(fetchProductsSuccess(data));
      } catch {
        dispatch(fetchProductsFailure('Error 403'));
      }
    };
  };
  
  export const setCurrentPage = page => {
    return {
      type: SET_CURRENT_PAGE,
      payload: page,
    };
  };
  
  export const resetCurrentPage = () => {
    return {
      type: RESET_CURRENT_PAGE,
    };
  };
  
  export const sortByPriceHandler = event => {
    return {
      type: SORT_BY_PRICE_HANDLER,
      payload: event,
    };
  };
  
  export const deleteProductsTrigger = (id, categoryId, subCategoryId, page, sortOrder) => {
    return async dispatch => {
      dispatch(fetchProductsRequest());
  
      try {
        await productsItemAPI.deleteProduct(id);
        const data = await productsItemAPI.fetchProducts(categoryId, subCategoryId, page, sortOrder);
        dispatch(fetchProductsSuccess(data));
      } catch {
        dispatch(fetchProductsFailure('Error 403'));
      }
    };
  };
  
  export const setPopularProducts = () => {
    return async dispatch => {
      dispatch(fetchProductsRequest());
  
      try {
        const data = await productsItemAPI.fetchPopularProducts();
        dispatch(fetchProductsSuccess(data));
      } catch {
        dispatch(fetchProductsFailure('Error 403'));
      }
    };
  };
  
  export const addToTopSales = (id, newData, categoryId, subCategoryId, page, sortOrder) => {
    return async dispatch => {
      try {
        await productsItemAPI.addToTopSales(id, newData);
        const data = await productsItemAPI.fetchProducts(categoryId, subCategoryId, page, sortOrder);
        dispatch(fetchProductsSuccess(data));
      } catch {
        dispatch(fetchProductsFailure('Error 403'));
      }
    };
  };
  
  export const deleteFromTopSales = (id, newData) => {
    return async dispatch => {
      try {
        await productsItemAPI.addToTopSales(id, newData);
        const data = await productsItemAPI.fetchPopularProducts();
        dispatch(fetchProductsSuccess(data));
      } catch {
        dispatch(fetchProductsFailure('Error 403'));
      }
    };
  };

export const setTestArr = (data) => {
    return {
        type: TEST_ARR,
        data
    };
};