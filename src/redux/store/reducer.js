import * as actionTypes from '../actions/actions';
  
  const initialState = {
    data: [],
    singleUser: {},
    error: '',
    loading: false,
    isOpen: false,
    isLoginOpen: false,
    token: ''
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_REQUEST:
          return {
            ...state,
            loading: true,
          };
    
        case actionTypes.FETCH_USERS_SUCCESS:
          return {
            ...state,
            data: action.data,
            loading: false,
          };

        case actionTypes.FETCH_SINGLE_USER:
          return {
            ...state,
            singleUser: action.data,
            loading: false,
          }; 
    
        case actionTypes.FETCH_USERS_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };

        case actionTypes.ON_MODAL_OPEN:
          return {
            ...state,
            isOpen: true
          };

        case actionTypes.ON_MODAL_CLOSE:
          return {
            ...state,
            isOpen: false
          };

        case actionTypes.ON_LOGIN_OPEN:
          return {
            ...state,
            isLoginOpen: true
          };

        case actionTypes.ON_LOGIN_CLOSE:
          return {
            ...state,
            isLoginOpen: false
          };

        case actionTypes.GET_TOKEN:
          return {
            ...state,
            token: action.token
          };

        default:
            return state;
    };
};

export default reducer;