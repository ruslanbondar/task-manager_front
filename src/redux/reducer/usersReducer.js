import {
  FETCH_SINGLE_USER,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST
} from "../types/index";

const initialState = {
  data: [],
  singleUser: {},
  error: "",
  loading: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };

    case FETCH_SINGLE_USER:
      return {
        ...state,
        singleUser: action.data,
        loading: false
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default usersReducer;
