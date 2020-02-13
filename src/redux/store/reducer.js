import * as actionTypes from "../actions/actions";

const initialState = {
  data: [],
  singleUser: {},
  error: "",
  loading: false,
  isOpen: false,
  isLoginOpen: false,
  tasks: [],
  currentPage: 1,
  completed: false,
  date: 'desc'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };

    case actionTypes.FETCH_SINGLE_USER:
      return {
        ...state,
        singleUser: action.data,
        loading: false
      };

    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
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

    //************************tasks************************

    case actionTypes.FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.data,
        loading: false
      };

    case actionTypes.FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case actionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case actionTypes.SORT_HANDLER:
      return {
        ...state,
        completed: action.payload
      };
    case actionTypes.SORT_BY_DATE_HANDLER:
      return {
        ...state,
        date: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
