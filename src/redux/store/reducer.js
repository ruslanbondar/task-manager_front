import * as actionTypes from '../actions/actions';
  
  const initialState = {
    data: [],
    error: '',
    loading: false,
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
    
        case actionTypes.FETCH_USERS_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload,
          };

        default:
            return state;
    };
};

export default reducer;